import { useQuery } from '@tanstack/react-query';
import api from '../../client/api';

export const useGetServices = () => {
	return useQuery({
		queryKey: ['services'],
		queryFn: api.getUserServices,
		refetchOnWindowFocus: false,
		select: (data) => data.data.data?.content,
	});
};
