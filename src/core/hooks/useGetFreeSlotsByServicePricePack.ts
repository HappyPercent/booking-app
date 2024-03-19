import { useQuery } from '@tanstack/react-query';
import api from '../../client/api';

export const useGetFreeSlotsByServicePricePack = (data?: { ownerId: number; deskId: number; proposalId: number; pricePackId: number }) =>
	useQuery({
		queryKey: ['freeSlots', data?.ownerId, data?.deskId, data?.proposalId, data?.pricePackId],
		queryFn: () => (data ? api.getFreeSlotsByServicePricePack(data) : undefined),
		refetchOnWindowFocus: false,
		select: (data) => data?.data?.data?.content,
		enabled: !!data,
	});
