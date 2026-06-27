import { useState } from "react";
import { toast } from "sonner";
import {
  useAssignedRoundsQuery,
  useSubmitFeedbackMutation,
} from "./use-interviewer";
import type { AssignedInterviewRound } from "../types/interviewer.types";

export const useInterviewerDashboard = () => {
  const { data: assignedRounds } = useAssignedRoundsQuery();
  const submitFeedbackMutation = useSubmitFeedbackMutation();

  const [selectedRound, setSelectedRound] =
    useState<AssignedInterviewRound | null>(null);
  const [overallScore, setOverallScore] = useState<number>(7);
  const [feedbackText, setFeedbackText] = useState("");
  const [ratings, setRatings] = useState<Record<string, number>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const startEvaluation = (round: AssignedInterviewRound) => {
    setSelectedRound(round);
    setOverallScore(7);
    setFeedbackText("");

    // Initialize rubric ratings to 7
    const initialRatings: Record<string, number> = {};
    round.template.rubric.forEach((criterion) => {
      initialRatings[criterion] = 7;
    });
    setRatings(initialRatings);
  };

  const handleRatingChange = (criterion: string, val: number) => {
    setRatings((prev) => ({
      ...prev,
      [criterion]: val,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRound) return;
    if (!feedbackText.trim()) {
      toast.error("Feedback comments are required");
      return;
    }

    setIsSubmitting(true);
    try {
      await submitFeedbackMutation.mutateAsync({
        roundId: selectedRound.id,
        data: {
          score: overallScore,
          feedback: feedbackText,
          rubricRatings: ratings,
        },
      });
      toast.success("Feedback submitted successfully!");
      setSelectedRound(null);
    } catch (error: unknown) {
      console.error(error);
      toast.error("Failed to submit feedback");
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    assignedRounds,
    selectedRound,
    setSelectedRound,
    overallScore,
    setOverallScore,
    feedbackText,
    setFeedbackText,
    ratings,
    handleRatingChange,
    isSubmitting,
    startEvaluation,
    handleSubmit,
  };
};
