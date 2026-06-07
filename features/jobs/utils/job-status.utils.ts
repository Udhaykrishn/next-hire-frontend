export const getStatusColor = (status: string | null | undefined): string => {
  switch (status) {
    case "REVIEWING":
      return "bg-blue-50 text-blue-700 border-blue-200";
    case "SHORTLISTED":
    case "INTERVIEWING":
      return "bg-wise-green/10 text-dark-green border-wise-green/30";
    case "REJECTED":
      return "bg-red-50 text-red-600 border-red-200";
    case "HIRED":
      return "bg-wise-green text-dark-green border-wise-green/50";
    case "PENDING":
    default:
      return "bg-gray-100 text-gray-600 border-gray-200";
  }
};

export const formatDaysAgo = (dateStr?: string | null): string => {
  if (!dateStr) return "Just now";
  const date = new Date(dateStr);
  const diffTime = Math.abs(new Date().getTime() - date.getTime());
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  return `${diffDays} days ago`;
};
