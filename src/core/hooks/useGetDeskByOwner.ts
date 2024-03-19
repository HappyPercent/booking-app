import { useQuery } from '@tanstack/react-query';
import api from '../../client/api';

export const useGetDeskByOwner = (ownerId: string) =>
	useQuery({
		queryKey: ['deskByOwner', ownerId],
		queryFn: () => api.getDeskByOwner(ownerId),
		refetchOnWindowFocus: false,
		select: (data) => data?.data?.data?.content,
	});
