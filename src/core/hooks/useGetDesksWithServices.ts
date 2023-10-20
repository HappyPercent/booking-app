import {useQuery} from "@tanstack/react-query";
import {getUserDesksWithProposals} from "../requests/getUserDesksWithProposals";

export const useGetDesksWithServices = () =>
  useQuery({
    queryKey: ["desksWithServices"],
    queryFn: getUserDesksWithProposals,
  });
