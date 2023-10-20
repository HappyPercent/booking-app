import {useQuery} from "@tanstack/react-query";
import {getUserServices} from "../requests/getUserServices";
import {IService} from "../constants/types";

export const useGetServices = () => {
  return useQuery<{content: IService[]}>({
    queryKey: ["services"],
    queryFn: getUserServices,
  });
};
