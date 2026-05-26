import { useProfileContext } from "@/context/profile-context";

export const useProfile = () => {
  const context = useProfileContext();
  return {
    ...context,
  };
};
