import {
  useMutation,
  useQueryClient,
  useQuery,
} from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import { useDebouncedValue } from "@tanstack/react-pacer";
import { adminService } from "../services/admin.api";

export const useAdminRecruiters = () => {
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Use TanStack Pacer to debounce recruiter searches
  const [debouncedSearchQuery] = useDebouncedValue(searchQuery, { wait: 400 });

  const { data, isPending } = useQuery({
    queryKey: ["admin-recruiters", debouncedSearchQuery, selectedStatuses, currentPage],
    queryFn: () =>
      adminService.getRecruiters(
        currentPage,
        itemsPerPage,
        debouncedSearchQuery,
        selectedStatuses[0] || "",
      ),
  });

  const blockMutation = useMutation({
    mutationFn: (id: string) =>
      adminService.updateRecruiterStatus(id, "Blocked"),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-recruiters"] });
      toast.success("Recruiter access restricted");
    },
  });

  const handleStatusToggle = (status: string) => {
    setSelectedStatuses((prev) =>
      prev.includes(status) ? [] : [status]
    );
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setSelectedStatuses([]);
    setCurrentPage(1);
  };

  return {
    recruiters: data?.data || [],
    total: data?.total || 0,
    searchQuery,
    setSearchQuery: (val: string) => {
      setSearchQuery(val);
      setCurrentPage(1);
    },
    selectedStatuses,
    handleStatusToggle,
    clearFilters,
    currentPage,
    setCurrentPage,
    itemsPerPage,
    handleConfirmBlock: (id: string) => blockMutation.mutate(id),
    isBlockingPending: blockMutation.isPending,
    isPending,
  };
};
