import { useState } from "react";
import { toast } from "sonner";
import {
  useInterviewersQuery,
  useTemplatesQuery,
  useRoundsQuery,
  useScheduleRoundMutation,
} from "./use-interviewer";

export const useCandidateRounds = (applicationId: string) => {
  const { data: interviewers } = useInterviewersQuery();
  const { data: templates } = useTemplatesQuery();
  const { data: rounds } = useRoundsQuery(applicationId);
  const scheduleMutation = useScheduleRoundMutation();

  const [interviewerId, setInterviewerId] = useState("");
  const [templateId, setTemplateId] = useState("");
  const [scheduledAt, setScheduledAt] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSchedule = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!interviewerId || !templateId || !scheduledAt) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsSubmitting(true);
    try {
      await scheduleMutation.mutateAsync({
        applicationId,
        interviewerId,
        templateId,
        scheduledAt: new Date(scheduledAt).toISOString(),
      });
      toast.success("Interview round scheduled successfully!");
      setInterviewerId("");
      setTemplateId("");
      setScheduledAt("");
    } catch (error: unknown) {
      console.error(error);
      toast.error("Failed to schedule interview round");
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    interviewers,
    templates,
    rounds,
    interviewerId,
    setInterviewerId,
    templateId,
    setTemplateId,
    scheduledAt,
    setScheduledAt,
    isSubmitting,
    handleSchedule,
  };
};
