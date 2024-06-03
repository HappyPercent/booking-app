import { useMutation } from '@tanstack/react-query';
import api from '../../client/api';
import { INewServiceFormData } from '../components/ServiceForm/types';

export const useCreateServiceMutation = (callback?: { onSuccess?: () => void }) => {
	return useMutation(
		async (data: INewServiceFormData) => {
			return await api.createService({
				name: data!.name,
				categoryId: data!.categoryId,
				shortDescr: data!.shortDescr || '',
				descr: data!.descr,
				pricePack: data!.pricePack.map((pack) => ({
					...pack,
					price: +pack.price,
					duration: +pack.duration,
				})),
			});
		},
		{
			onSuccess: callback?.onSuccess,
		}
	);
};
