import { useQuery } from '@tanstack/react-query';
import api from '../../client/api';

export const useGetSlotsByDesk = (deskId: number) =>
	useQuery({
		queryKey: ['slotsWithDesks', deskId],
		queryFn: async () => api.getSlotsByDesk(deskId),
		select: (data) => data.data.data?.content,
	});
