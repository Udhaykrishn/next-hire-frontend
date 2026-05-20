import { useDebouncedValue } from "@tanstack/react-pacer";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import { adminService } from "../services/admin.api";

export const useAdminJobs = () => {
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Use TanStack Pacer to debounce job searches
  const [debouncedSearchQuery] = useDebouncedValue(searchQuery, { wait: 400 });

  const { data, isPending } = useQuery({
    queryKey: [
      "admin-jobs",
      debouncedSearchQuery,
      selectedStatuses,
      currentPage,
    ],
    queryFn: () =>
      adminService.getJobs(
        currentPage,
        itemsPerPage,
        debouncedSearchQuery,
        selectedStatuses[0] || "",
      ),
  });

  const blockMutation = useMutation({
    mutationFn: (id: string) => adminService.updateJobStatus(id, "Blocked"),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-jobs"] });
      toast.success("Job status updated successfully");
    },
  });

  const handleStatusToggle = (status: string) => {
    setSelectedStatuses((prev) =>
      prev.includes(status)
        ? prev.filter((s) => s !== status)
        : [...prev, status],
    );
    setCurrentPage(1);
  };

  return {
    jobs: data?.data || [],
    total: data?.total || 0,
    searchQuery,
    setSearchQuery: (val: string) => {
      setSearchQuery(val);
      setCurrentPage(1);
    },
    selectedStatuses,
    handleStatusToggle,
    currentPage,
    setCurrentPage,
    itemsPerPage,
    handleConfirmBlock: (id: string) => blockMutation.mutate(id),
    isBlockingPending: blockMutation.isPending,
    isPending,
  };
};
