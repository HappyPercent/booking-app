import {useQuery} from "@tanstack/react-query";
import {getUserDesks} from "../requests/getUserDesks";

export const useGetDesks = () =>
  useQuery({
    queryKey: ["desks"],
    queryFn: getUserDesks,
    cacheTime: 10000,
  });
