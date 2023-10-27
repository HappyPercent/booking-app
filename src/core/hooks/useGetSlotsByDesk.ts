import {useQuery} from "@tanstack/react-query";
import {getSlotsByDesk} from "../requests/getSlotsByDesk";

export const useGetSlotsByDesk = (deskId: number) =>
  useQuery({
    queryKey: ["slotsWithDesks", deskId],
    queryFn: () => getSlotsByDesk(deskId),
    cacheTime: 0,
  });
