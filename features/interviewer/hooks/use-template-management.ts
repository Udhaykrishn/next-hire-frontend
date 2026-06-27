import { useState } from "react";
import { toast } from "sonner";
import {
  useTemplatesQuery,
  useCreateTemplateMutation,
  useDeleteTemplateMutation,
} from "./use-interviewer";

export const useTemplateManagement = () => {
  const { data: templates } = useTemplatesQuery();
  const createMutation = useCreateTemplateMutation();
  const deleteMutation = useDeleteTemplateMutation();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState(45);
  const [rubric, setRubric] = useState<string[]>([
    "Technical Skills",
    "Problem Solving",
  ]);
  const [newCriterion, setNewCriterion] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const addCriterion = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!newCriterion.trim()) return;
    if (rubric.includes(newCriterion.trim())) {
      toast.error("Criterion already exists");
      return;
    }
    setRubric((prev) => [...prev, newCriterion.trim()]);
    setNewCriterion("");
  };

  const removeCriterion = (index: number) => {
    setRubric((prev) => prev.filter((_, idx) => idx !== index));
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) {
      toast.error("Template name is required");
      return;
    }
    if (rubric.length === 0) {
      toast.error("At least one rubric criterion is required");
      return;
    }

    setIsSubmitting(true);
    try {
      await createMutation.mutateAsync({
        name,
        description: description || undefined,
        duration: Number(duration),
        rubric,
      });
      toast.success("Interview template created successfully!");
      setName("");
      setDescription("");
      setDuration(45);
      setRubric(["Technical Skills", "Problem Solving"]);
    } catch (error: unknown) {
      console.error(error);
      toast.error("Failed to create template");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this template?")) {
      return;
    }

    try {
      await deleteMutation.mutateAsync(id);
      toast.success("Template deleted successfully");
    } catch (error: unknown) {
      console.error(error);
      toast.error("Failed to delete template");
    }
  };

  return {
    templates,
    name,
    setName,
    description,
    setDescription,
    duration,
    setDuration,
    rubric,
    newCriterion,
    setNewCriterion,
    addCriterion,
    removeCriterion,
    isSubmitting,
    handleCreate,
    handleDelete,
  };
};
