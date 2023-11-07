import {useQuery} from "@tanstack/react-query";
import api from "../../client/api";

export const useGetDesks = () =>
  useQuery({
    queryKey: ["desks"],
    queryFn: async () => {
      const data = await api.getUserDesks();
      return data.data;
    },
    refetchOnWindowFocus: false,
  });
