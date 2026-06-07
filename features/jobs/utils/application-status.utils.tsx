import {
  Clock,
  Search,
  MessageSquare,
  XCircle,
  CheckCircle2,
} from "lucide-react";

export const getStatusConfig = (status: string) => {
  switch (status) {
    case "PENDING":
      return {
        color: "text-gray-600 bg-gray-100",
        icon: <Clock className="w-4 h-4" />,
        label: "Applied",
      };
    case "REVIEWING":
      return {
        color: "text-blue-600 bg-blue-50",
        icon: <Search className="w-4 h-4" />,
        label: "In Review",
      };
    case "SHORTLISTED":
    case "INTERVIEWING":
      return {
        color: "text-wise-green bg-wise-green/10",
        icon: <MessageSquare className="w-4 h-4" />,
        label: "Interviewing",
      };
    case "REJECTED":
      return {
        color: "text-red-600 bg-red-50",
        icon: <XCircle className="w-4 h-4" />,
        label: "Rejected",
      };
    case "HIRED":
      return {
        color: "text-wise-green bg-wise-green/10",
        icon: <CheckCircle2 className="w-4 h-4" />,
        label: "Hired",
      };
    default:
      return {
        color: "text-gray-600 bg-gray-100",
        icon: <Clock className="w-4 h-4" />,
        label: status,
      };
  }
};
