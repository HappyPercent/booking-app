import {useQuery} from "@tanstack/react-query";
import api from "../../client/api";

export const useGetSlotsByDesk = (deskId: number) =>
  useQuery({
    queryKey: ["slotsWithDesks", deskId],
    queryFn: async () => (await api.getSlotsByDesk(deskId)).data,
  });
