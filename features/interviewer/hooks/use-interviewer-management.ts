import { useState } from "react";
import { toast } from "sonner";
import {
  useInterviewersQuery,
  useCreateInterviewerMutation,
  useDeleteInterviewerMutation,
} from "./use-interviewer";

export const useInterviewerManagement = () => {
  const { data: interviewers } = useInterviewersQuery();
  const createMutation = useCreateInterviewerMutation();
  const deleteMutation = useDeleteInterviewerMutation();

  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !department) {
      toast.error("Please fill in email and department");
      return;
    }

    setIsSubmitting(true);
    try {
      await createMutation.mutateAsync({
        email,
        department,
        password: password || undefined,
      });
      toast.success("Interviewer registered successfully!");
      setEmail("");
      setDepartment("");
      setPassword("");
    } catch (error: unknown) {
      console.error(error);
      toast.error("Failed to register interviewer");
    } finally {
      setIsSubmitting(false);
    }
  };

  const requestDelete = (id: string) => setDeleteTargetId(id);
  const cancelDelete = () => setDeleteTargetId(null);

  const confirmDelete = async () => {
    if (!deleteTargetId) return;

    try {
      await deleteMutation.mutateAsync(deleteTargetId);
      toast.success("Interviewer removed successfully");
    } catch (error: unknown) {
      console.error(error);
      toast.error("Failed to remove interviewer");
    } finally {
      setDeleteTargetId(null);
    }
  };

  return {
    interviewers,
    email,
    setEmail,
    department,
    setDepartment,
    password,
    setPassword,
    isSubmitting,
    handleCreate,
    deleteTargetId,
    requestDelete,
    cancelDelete,
    confirmDelete,
    isDeleting: deleteMutation.isPending,
  };
};
