import { useMutation } from '@tanstack/react-query';
import api from '../../client/api';

export const useCreateSlotsForDeskMutation = (callbacks?: { onSuccess: () => void }) => {
	return useMutation(
		async (payload: {
			schedule: {
				dateTimeStart: string;
				dateTimeEnd: string;
			}[];
			deskId: number;
		}) => {
			return await api.createSlotsForDesk(payload.deskId, payload.schedule);
		},
		{
			onSuccess: callbacks?.onSuccess,
		}
	);
};
