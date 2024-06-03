import { useMutation } from '@tanstack/react-query';
import api from '../../client/api';
import { IDeskFormValues } from '../components/DeskForm/types';

export const useCreateDeskMutation = (callback?: { onSuccess?: () => void }) => {
	return useMutation(
		async (data: IDeskFormValues) => {
			return await api.createDesk({
				name: data.name,
				cityId: data.city!.id,
				countryId: data.country!.id,
			});
		},
		{
			onSuccess: callback?.onSuccess,
		}
	);
};
