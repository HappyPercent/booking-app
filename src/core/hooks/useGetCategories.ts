import { useQuery } from '@tanstack/react-query';
import api from '../../client/api';

export const useGetCategories = () => {
	return useQuery({
		queryKey: ['allCategories'],
		queryFn: async () => (await api.getCategoryRootAll()).data,
		refetchOnWindowFocus: false,
		select: (data) => data.data.content,
	});
};
