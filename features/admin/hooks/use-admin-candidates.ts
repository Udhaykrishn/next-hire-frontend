import { useDebouncedValue } from "@tanstack/react-pacer";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import { adminService } from "../services/admin.api";

export const useAdminCandidates = () => {
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Use TanStack Pacer's useDebouncedValue to throttle/debounce search queries to the NestJS backend
  const [debouncedSearchQuery] = useDebouncedValue(searchQuery, { wait: 400 });

  const { data, isPending } = useQuery({
    queryKey: [
      "admin-candidates",
      debouncedSearchQuery,
      selectedStatuses,
      currentPage,
    ],
    queryFn: () =>
      adminService.getCandidates(
        currentPage,
        itemsPerPage,
        debouncedSearchQuery,
        selectedStatuses[0] || "",
      ),
  });

  const blockMutation = useMutation({
    mutationFn: ({
      id,
      status,
      description,
    }: {
      id: string;
      status: string;
      description?: string;
    }) => adminService.updateCandidateStatus(id, status, description),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["admin-candidates"] });
      toast.success(
        variables.status === "Blocked"
          ? "Candidate access restricted"
          : "Candidate access restored",
      );
    },
  });

  const handleStatusToggle = (status: string) => {
    setSelectedStatuses((prev) => (prev.includes(status) ? [] : [status]));
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setSelectedStatuses([]);
    setCurrentPage(1);
  };

  return {
    candidates: data?.data || [],
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
    handleConfirmBlock: (id: string, status: string, description?: string) =>
      blockMutation.mutate({ id, status, description }),
    isBlockingPending: blockMutation.isPending,
    isPending,
  };
};
