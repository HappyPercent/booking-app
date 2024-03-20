import { useQuery } from '@tanstack/react-query';
import api from '../../client/api';

export const useGetDeskById = (deskId: string) =>
	useQuery({
		queryKey: ['deskById', deskId],
		queryFn: () => api.getDeskById(deskId),
		refetchOnWindowFocus: false,
		select: (data) => data?.data?.data?.content,
		enabled: !!deskId,
	});
