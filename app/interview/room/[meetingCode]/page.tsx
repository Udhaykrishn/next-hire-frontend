"use client";

import { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Video,
  VideoOff,
  Mic,
  MicOff,
  Monitor,
  MessageSquare,
  Users,
  Loader2,
  Send,
  Award,
  CheckCircle,
  XCircle,
  LogOut,
  ShieldAlert,
  Radio,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthContext } from "@/features/auth/context/auth-context";
import {
  useRoundRoomQuery,
  useJoinRoundRoomMutation,
  useSubmitFeedbackMutation,
} from "@/features/interview/hooks/use-interview";
import { toast } from "sonner";

interface ChatMessage {
  id: string;
  sender: string;
  text: string;
  timestamp: Date;
}

export default function VideoCallSimulationPage() {
  const { meetingCode } = useParams() as { meetingCode: string };
  const { role, isAuthenticated } = useAuthContext();
  const router = useRouter();

  const { data: round, isLoading, error } = useRoundRoomQuery(meetingCode);
  const joinRoomMutation = useJoinRoundRoomMutation(meetingCode);
  const submitFeedbackMutation = useSubmitFeedbackMutation(round?.id ?? "");

  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(true);

  // Participant join simulation state
  const [hasJoinedRoom, setHasJoinedRoom] = useState(false);
  const [userSelectedRole, setUserSelectedRole] = useState<
    "candidate" | "interviewer" | null
  >(null);

  // Simulated Chat
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessageText, setNewMessageText] = useState("");
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  // Evaluation Rubric Form
  const [generalScore, setGeneralScore] = useState(7);
  const [feedbackNotes, setFeedbackNotes] = useState("");
  const [rubricScores, setRubricScores] = useState<Record<string, number>>({});

  // Local camera stream reference (optional preview)
  const localVideoRef = useRef<HTMLVideoElement | null>(null);
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);

  // Determine active participant role
  const activeRole: "candidate" | "interviewer" | null = userSelectedRole
    ? userSelectedRole
    : isAuthenticated
      ? role === "CANDIDATE"
        ? "candidate"
        : "interviewer"
      : null;

  // Invalidate and join room when role is resolved
  useEffect(() => {
    if (round && activeRole && !hasJoinedRoom) {
      joinRoomMutation.mutate(activeRole, {
        onSuccess: () => {
          setHasJoinedRoom(true);
          toast.success(`Successfully joined meeting as ${activeRole}`);
        },
      });
    }
  }, [round, activeRole, hasJoinedRoom, joinRoomMutation]);

  // Request camera/mic stream
  // biome-ignore lint/correctness/useExhaustiveDependencies: stream lifecycle is managed manually; re-acquiring on localStream change would loop
  useEffect(() => {
    if (hasJoinedRoom && !isVideoOff) {
      navigator.mediaDevices
        ?.getUserMedia({ video: true, audio: true })
        .then((stream) => {
          setLocalStream(stream);
          if (localVideoRef.current) {
            localVideoRef.current.srcObject = stream;
          }
        })
        .catch((err) => {
          console.warn(
            "Media permissions not granted or camera missing: ",
            err,
          );
        });
    } else {
      if (localStream) {
        localStream.getTracks().forEach((track) => {
          track.stop();
        });
        setLocalStream(null);
      }
    }

    return () => {
      if (localStream) {
        localStream.getTracks().forEach((track) => {
          track.stop();
        });
      }
    };
  }, [hasJoinedRoom, isVideoOff]);

  // Auto-scroll chat
  // biome-ignore lint/correctness/useExhaustiveDependencies: scroll only when messages change
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-canvas flex flex-col items-center justify-center gap-4 font-satoshi">
        <Loader2 className="w-8 h-8 animate-spin text-coral" />
        <p className="text-muted-ink font-bold text-sm uppercase tracking-widest animate-pulse">
          Initializing Virtual Meeting Room...
        </p>
      </div>
    );
  }

  if (error || !round) {
    return (
      <div className="min-h-screen bg-canvas flex flex-col items-center justify-center p-8 gap-4 font-satoshi text-center">
        <ShieldAlert className="w-16 h-16 text-red-500" />
        <h1 className="text-2xl font-display font-black text-ink">
          Room Not Available
        </h1>
        <p className="text-muted-ink max-w-sm">
          The meeting link you used is invalid or expired. Check with the
          recruiter for a rescheduled round.
        </p>
        <Button
          onClick={() => router.push("/")}
          className="bg-ink hover:bg-ink/80 text-white rounded-xl h-11 px-6 font-bold"
        >
          Return Home
        </Button>
      </div>
    );
  }

  // Guest Role Selection screen
  if (!activeRole) {
    return (
      <div className="min-h-screen bg-canvas flex flex-col items-center justify-center p-8 font-satoshi">
        <div className="w-full max-w-md bg-white border border-hairline rounded-[2rem] p-8 shadow-sm text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-coral/10 text-coral flex items-center justify-center mx-auto mb-2">
            <Video className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-display font-black text-ink tracking-tight">
            Select Your Meeting Persona
          </h1>
          <p className="text-muted-ink text-sm font-medium">
            We couldn't determine your role automatically. Choose how you'd like
            to join the session:
          </p>

          <div className="flex flex-col gap-3">
            <Button
              onClick={() => setUserSelectedRole("candidate")}
              className="h-14 bg-white border border-hairline hover:bg-surface-soft text-ink font-bold rounded-2xl transition-all"
            >
              Join as Candidate (Shortlisted Applicant)
            </Button>
            <Button
              onClick={() => setUserSelectedRole("interviewer")}
              className="h-14 bg-coral hover:bg-coral-active text-white font-bold rounded-2xl transition-all"
            >
              Join as Interviewer (Hiring Team / Recruiter)
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const rubricList =
    round.templateId && typeof round.templateId === "object"
      ? round.templateId.rubric
      : ["Coding", "System Design", "Communication", "Problem Solving"];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessageText.trim()) return;

    const msg: ChatMessage = {
      id: Math.random().toString(),
      sender: activeRole === "candidate" ? "Candidate" : "Interviewer",
      text: newMessageText,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, msg]);
    setNewMessageText("");

    // Simulated automatic reply for interactive feel
    setTimeout(() => {
      const reply: ChatMessage = {
        id: Math.random().toString(),
        sender: activeRole === "candidate" ? "Interviewer" : "Candidate",
        text:
          activeRole === "candidate"
            ? "Understood, thank you. Let's proceed with the coding challenge next."
            : "Yes, I can hear you clearly. Ready to start when you are.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, reply]);
    }, 3000);
  };

  const handleEvaluationSubmit = async (outcome: "PASS" | "REJECTED") => {
    if (!feedbackNotes.trim()) {
      toast.error("Please add detailed feedback notes before submitting.");
      return;
    }

    // Fill default ratings for rubrics if not selected
    const finalRubricRatings: Record<string, number> = {};
    for (const key of rubricList) {
      finalRubricRatings[key] = rubricScores[key] || 7;
    }

    try {
      await submitFeedbackMutation.mutateAsync({
        score: generalScore,
        feedback: feedbackNotes,
        rubricRatings: finalRubricRatings,
        candidateStatus: outcome,
      });
      toast.success(
        `Candidate evaluated successfully. Set status to: ${outcome}`,
      );
      router.push("/recruiter/dashboard");
    } catch (err) {
      const msg =
        err instanceof Error ? err.message : "Failed to submit evaluation.";
      toast.error(msg);
    }
  };

  const isCompleted = round.status === "COMPLETED";
  const isBothConnected = round.candidateJoined && round.interviewerJoined;

  return (
    <div className="min-h-screen bg-canvas flex flex-col font-satoshi select-none text-ink">
      {/* Top Navbar */}
      <header className="h-16 px-6 bg-white border-b border-hairline flex items-center justify-between z-10 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-coral/10 text-coral flex items-center justify-center">
            <Video className="w-4.5 h-4.5" />
          </div>
          <div>
            <h1 className="font-bold text-sm tracking-tight text-ink leading-none">
              {round.templateId && typeof round.templateId === "object"
                ? round.templateId.name
                : "Interactive Interview Room"}
            </h1>
            <p className="text-[10px] text-muted-ink font-semibold uppercase tracking-wider mt-0.5 flex items-center gap-1.5">
              Room Code: {round.meetingCode} · Duration: {round.duration} min
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div
            className={`px-3 py-1 rounded-full text-[10px] font-bold border flex items-center gap-1.5 ${
              isBothConnected
                ? "bg-green-50 text-green-700 border-green-200"
                : "bg-amber-50 text-amber-700 border-amber-200 animate-pulse"
            }`}
          >
            <Radio className="w-3.5 h-3.5" />
            {isBothConnected ? "Interview Started" : "Awaiting Connection"}
          </div>

          <Button
            variant="ghost"
            onClick={() =>
              router.push(
                activeRole === "candidate" ? "/chat" : "/recruiter/dashboard",
              )
            }
            className="h-9 px-3 rounded-lg hover:bg-red-50 text-muted-ink hover:text-red-600 font-bold text-xs"
          >
            <LogOut className="w-4 h-4 mr-1.5" /> Leave Call
          </Button>
        </div>
      </header>

      {/* Main Calling Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Console: Video Grid */}
        <div className="flex-1 bg-navy p-6 flex flex-col justify-between overflow-y-auto relative">
          {/* Video Feeds Grid */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 items-center justify-center max-w-5xl mx-auto w-full">
            {/* Candidate Stream */}
            <div className="relative aspect-video rounded-2xl bg-navy-soft border border-navy-elevated overflow-hidden group flex items-center justify-center shadow-lg">
              {round.candidateJoined &&
              activeRole === "candidate" &&
              !isVideoOff ? (
                <video
                  ref={localVideoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover transform -scale-x-100"
                />
              ) : round.candidateJoined ? (
                // Simulated candidate graphic
                <div className="text-center space-y-3">
                  <div className="w-20 h-20 rounded-full bg-coral/20 text-coral flex items-center justify-center mx-auto animate-pulse">
                    <Users className="w-10 h-10" />
                  </div>
                  <p className="text-xs font-bold text-on-dark uppercase tracking-widest">
                    Candidate (Camera Connected)
                  </p>
                </div>
              ) : (
                <div className="text-center space-y-2">
                  <Loader2 className="w-6 h-6 animate-spin text-coral mx-auto" />
                  <p className="text-xs font-semibold text-on-dark-soft uppercase tracking-wider">
                    Awaiting candidate entry...
                  </p>
                </div>
              )}

              {/* Stream Overlay info */}
              <div className="absolute bottom-4 left-4 px-3 py-1.5 bg-navy/80 backdrop-blur-sm rounded-lg text-xs font-bold text-on-dark flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                Candidate {activeRole === "candidate" && " (You)"}
              </div>
            </div>

            {/* Interviewer Stream */}
            <div className="relative aspect-video rounded-2xl bg-navy-soft border border-navy-elevated overflow-hidden group flex items-center justify-center shadow-lg">
              {round.interviewerJoined &&
              activeRole === "interviewer" &&
              !isVideoOff ? (
                <video
                  ref={localVideoRef}
                  autoPlay
                  playsInline
                  className="w-full h-full object-cover"
                >
                  <track kind="captions" />
                </video>
              ) : round.interviewerJoined ? (
                <div className="text-center space-y-3">
                  <div className="w-20 h-20 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center mx-auto animate-pulse">
                    <Users className="w-10 h-10" />
                  </div>
                  <p className="text-xs font-bold text-on-dark uppercase tracking-widest">
                    Interviewer (Live)
                  </p>
                </div>
              ) : (
                <div className="text-center space-y-2">
                  <Loader2 className="w-6 h-6 animate-spin text-indigo-400 mx-auto" />
                  <p className="text-xs font-semibold text-on-dark-soft uppercase tracking-wider">
                    Awaiting interviewer entry...
                  </p>
                </div>
              )}

              <div className="absolute bottom-4 left-4 px-3 py-1.5 bg-navy/80 backdrop-blur-sm rounded-lg text-xs font-bold text-on-dark flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                Interviewer {activeRole === "interviewer" && " (You)"}
              </div>
            </div>
          </div>

          {/* Connection warnings */}
          {!isBothConnected && (
            <div className="absolute top-6 left-1/2 -translate-x-1/2 px-6 py-3 bg-amber-500/10 border border-amber-500/20 rounded-2xl text-xs font-semibold text-amber-500 backdrop-blur-sm shadow-md animate-pulse">
              Waiting for the other participant to join. The interview will
              start automatically once connected.
            </div>
          )}

          {/* Tool Control Bar */}
          <div className="flex items-center justify-center gap-4 py-4 mt-6">
            <Button
              onClick={() => setIsMuted(!isMuted)}
              className={`w-12 h-12 rounded-full border border-navy-elevated flex items-center justify-center transition-colors shadow-md ${
                isMuted
                  ? "bg-red-500 hover:bg-red-600 text-white"
                  : "bg-navy-elevated hover:bg-navy-soft text-on-dark"
              }`}
            >
              {isMuted ? (
                <MicOff className="w-5 h-5" />
              ) : (
                <Mic className="w-5 h-5" />
              )}
            </Button>

            <Button
              onClick={() => setIsVideoOff(!isVideoOff)}
              className={`w-12 h-12 rounded-full border border-navy-elevated flex items-center justify-center transition-colors shadow-md ${
                isVideoOff
                  ? "bg-red-500 hover:bg-red-600 text-white"
                  : "bg-navy-elevated hover:bg-navy-soft text-on-dark"
              }`}
            >
              {isVideoOff ? (
                <VideoOff className="w-5 h-5" />
              ) : (
                <Video className="w-5 h-5" />
              )}
            </Button>

            <Button
              onClick={() => setIsScreenSharing(!isScreenSharing)}
              className={`w-12 h-12 rounded-full border border-navy-elevated flex items-center justify-center transition-colors shadow-md ${
                isScreenSharing
                  ? "bg-coral text-white hover:bg-coral-active"
                  : "bg-navy-elevated hover:bg-navy-soft text-on-dark"
              }`}
            >
              <Monitor className="w-5 h-5" />
            </Button>

            <div className="w-px h-6 bg-navy-elevated mx-2" />

            <Button
              onClick={() => setIsChatOpen(!isChatOpen)}
              className={`w-12 h-12 rounded-full border border-navy-elevated flex items-center justify-center transition-colors shadow-md ${
                isChatOpen
                  ? "bg-indigo-500 text-white hover:bg-indigo-600"
                  : "bg-navy-elevated hover:bg-navy-soft text-on-dark"
              }`}
            >
              <MessageSquare className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Right Sidebar: Assessment Form OR Chat */}
        {activeRole === "interviewer" && !isCompleted ? (
          <div className="w-80 border-l border-hairline bg-white flex flex-col overflow-hidden shrink-0">
            <div className="p-5 border-b border-hairline bg-canvas">
              <h3 className="font-display font-black text-base text-ink tracking-tight flex items-center gap-1.5">
                <Award className="w-5 h-5 text-coral" /> Candidate Evaluation
              </h3>
              <p className="text-[10px] text-muted-ink font-semibold uppercase tracking-wider mt-0.5">
                Grading & Assessment Rubric
              </p>
            </div>

            <div className="flex-1 p-5 overflow-y-auto space-y-5">
              {/* General Score */}
              <div className="space-y-2">
                <Label
                  htmlFor="general-score"
                  className="text-xs font-bold uppercase tracking-wider text-muted-ink flex justify-between"
                >
                  <span>General Rating Score</span>
                  <span className="text-coral font-black">
                    {generalScore} / 10
                  </span>
                </Label>
                <Input
                  id="general-score"
                  type="range"
                  min="1"
                  max="10"
                  value={generalScore}
                  onChange={(e) => setGeneralScore(Number(e.target.value))}
                  className="accent-coral"
                />
              </div>

              {/* Rubrics grid */}
              <div className="space-y-3 pt-2 border-t border-hairline">
                <span className="text-[10px] text-muted-ink font-black uppercase tracking-wider block">
                  Criteria Breakdown
                </span>
                {rubricList.map((criteria) => (
                  <div
                    key={criteria}
                    className="flex items-center justify-between gap-4"
                  >
                    <span className="text-xs font-bold text-body">
                      {criteria}
                    </span>
                    <select
                      value={rubricScores[criteria] || 7}
                      onChange={(e) =>
                        setRubricScores((prev) => ({
                          ...prev,
                          [criteria]: Number(e.target.value),
                        }))
                      }
                      className="h-8 bg-white border border-hairline rounded-lg text-xs font-bold focus:ring-0 focus:outline-none"
                    >
                      {Array.from({ length: 10 }, (_, i) => 10 - i).map((n) => (
                        <option key={n} value={n}>
                          {n}
                        </option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>

              {/* Feedback Textarea */}
              <div className="space-y-2 pt-2 border-t border-hairline">
                <Label
                  htmlFor="notes"
                  className="text-xs font-bold uppercase tracking-wider text-muted-ink"
                >
                  Assessment Notes
                </Label>
                <Textarea
                  id="notes"
                  placeholder="Write candidate coding evaluations, pros, cons, and communication reviews..."
                  value={feedbackNotes}
                  onChange={(e) => setFeedbackNotes(e.target.value)}
                  className="min-h-[120px] text-xs resize-none bg-canvas border-hairline rounded-xl"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="p-4 border-t border-hairline bg-canvas flex gap-2">
              <Button
                onClick={() => handleEvaluationSubmit("REJECTED")}
                disabled={submitFeedbackMutation.isPending}
                className="flex-1 h-11 bg-white hover:bg-red-50 text-red-600 border border-red-200 font-bold text-xs rounded-xl flex items-center justify-center gap-1"
              >
                <XCircle className="w-4 h-4" /> Fail Round
              </Button>
              <Button
                onClick={() => handleEvaluationSubmit("PASS")}
                disabled={submitFeedbackMutation.isPending}
                className="flex-1 h-11 bg-coral hover:bg-coral-active text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1 shadow-md shadow-coral/10"
              >
                <CheckCircle className="w-4 h-4" /> Pass Candidate
              </Button>
            </div>
          </div>
        ) : (
          /* Chat Box (Candidate or Interviewer if chat open) */
          isChatOpen && (
            <div className="w-80 border-l border-hairline bg-white flex flex-col overflow-hidden shrink-0">
              <div className="p-5 border-b border-hairline bg-canvas flex items-center justify-between">
                <div>
                  <h3 className="font-display font-black text-base text-ink tracking-tight flex items-center gap-1.5">
                    <MessageSquare className="w-5 h-5 text-coral" /> Session
                    Chat
                  </h3>
                  <p className="text-[10px] text-muted-ink font-semibold uppercase tracking-wider mt-0.5">
                    Live session messages
                  </p>
                </div>
              </div>

              {/* Chat Area */}
              <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-canvas/30">
                {messages.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center text-xs text-muted-soft">
                    <MessageSquare className="w-8 h-8 opacity-20 mb-2" />
                    <span>
                      No messages yet. Send a note to the{" "}
                      {activeRole === "candidate" ? "Interviewer" : "Candidate"}
                      .
                    </span>
                  </div>
                ) : (
                  messages.map((msg) => {
                    const isSelf =
                      (msg.sender === "Candidate" &&
                        activeRole === "candidate") ||
                      (msg.sender === "Interviewer" &&
                        activeRole === "interviewer");
                    return (
                      <div
                        key={msg.id}
                        className={`flex flex-col max-w-[85%] ${isSelf ? "ml-auto items-end" : "mr-auto items-start"}`}
                      >
                        <span className="text-[9px] font-bold text-muted-ink mb-0.5">
                          {msg.sender}
                        </span>
                        <div
                          className={`p-3 rounded-2xl text-xs leading-relaxed ${
                            isSelf
                              ? "bg-coral text-white rounded-tr-none"
                              : "bg-white border border-hairline text-ink rounded-tl-none shadow-sm"
                          }`}
                        >
                          {msg.text}
                        </div>
                      </div>
                    );
                  })
                )}
                <div ref={chatEndRef} />
              </div>

              {/* Chat Input */}
              <form
                onSubmit={handleSendMessage}
                className="p-3 border-t border-hairline bg-white flex gap-2"
              >
                <Input
                  placeholder="Write message..."
                  value={newMessageText}
                  onChange={(e) => setNewMessageText(e.target.value)}
                  className="h-10 bg-canvas border-hairline text-xs rounded-xl focus-visible:ring-coral"
                />
                <Button
                  type="submit"
                  size="icon"
                  className="h-10 w-10 shrink-0 bg-coral hover:bg-coral-active text-white rounded-xl"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </form>
            </div>
          )
        )}
      </div>
    </div>
  );
}
