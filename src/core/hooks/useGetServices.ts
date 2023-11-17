import { useQuery } from '@tanstack/react-query';
import { IService } from '../constants/types';
import api from '../../client/api';

export const useGetServices = () => {
	return useQuery<{ content: IService[] }>({
		queryKey: ['services'],
		queryFn: async () => {
			const data = (await api.getUserServices()).data;
			return data;
		},
		refetchOnWindowFocus: false,
	});
};
