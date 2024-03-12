import { useQuery } from '@tanstack/react-query';
import api from '../../client/api';

export const useGetDesks = () =>
	useQuery({
		queryKey: ['desks'],
		queryFn: api.getUserDesks,
		refetchOnWindowFocus: false,
		select: (data) => data.data.data?.content,
	});
