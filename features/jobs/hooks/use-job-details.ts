import { useParams, useRouter } from "next/navigation";
import { useJobDetailsQuery } from "./use-jobs-query";

export function useJobDetails() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const { data: job } = useJobDetailsQuery(id);

  const formatSalary = (min: string | undefined, max: string | undefined) => {
    const minVal = parseFloat(min || "0") || 0;
    const maxVal = parseFloat(max || "0") || 0;
    if (minVal && maxVal) {
      return `$${Math.round(minVal / 1000)}k - $${Math.round(maxVal / 1000)}k`;
    }
    if (minVal) {
      return `$${Math.round(minVal / 1000)}k+`;
    }
    if (maxVal) {
      return `$${Math.round(maxVal / 1000)}k`;
    }
    return "Negotiable";
  };

  const formatDate = (dateStr: string | undefined) => {
    if (!dateStr) return "Recently";
    const date = new Date(dateStr);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    return `${diffDays} days ago`;
  };

  const formattedSalary = formatSalary(job?.minSalary, job?.maxSalary);
  const formattedDate = formatDate(job?.created_at);

  const handleBack = () => {
    router.back();
  };

  return {
    job,
    formattedSalary,
    formattedDate,
    handleBack,
  };
}
