import { useMutation } from '@tanstack/react-query';
import api from '../../client/api';

export const useLinkServiceToDeskMutation = (callbacks?: { onSuccess: () => void }) => {
	return useMutation(
		async (payload: { serviceId: number; deskId: number }) => {
			return await api.linkProposalToDesk(payload.serviceId, payload.deskId);
		},
		{
			onSuccess: callbacks?.onSuccess,
		}
	);
};
