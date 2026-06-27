import { InterviewRoundScheduler } from "@/features/interview/components/interview-round-scheduler";

export const dynamic = "force-dynamic";

export default function RecruiterInterviewRoundsPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <InterviewRoundScheduler />
    </div>
  );
}
