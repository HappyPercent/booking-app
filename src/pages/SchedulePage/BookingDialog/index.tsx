import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material';
import { Navigate, useLocation, useSearchParams } from 'react-router-dom';
import { isUserLoggedIn } from '../../../core/helpers/isUserLoggedIn';
import { routesList } from '../../../routes/routesList';
import { useEffect, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../../../client/api';
import { IPricePack } from '../../../core/constants/types';

export const BookingDialog = ({ data }: { data: { ownerId: number; deskId: number; proposalId: number; pricePack: Partial<IPricePack> } }) => {
	const [query, setQuery] = useSearchParams();
	const queryBooking = query.get('booking');
	const location = useLocation();
	const [slotsIds, setSlotsIds] = useState<string[]>([]);
	const queryClient = useQueryClient();

	useEffect(() => {
		try {
			const bookingData = queryBooking ? JSON.parse(queryBooking) : null;
			console.log('bookingData: ', bookingData);
			setSlotsIds(bookingData?.slotsIds);
		} catch (e) {
			console.error('Failed to parse booking data', e);
		}
	}, [queryBooking]);

	const handleClose = () => {
		query.delete('booking');
		setQuery(query);
	};
	const { mutate: bookSlots } = useMutation(
		() =>
			api.bookSlot({
				ownerId: data.ownerId,
				deskId: data.deskId,
				proposalId: data.proposalId,
				pricePackId: data.pricePack?.id || 0,
				slotsIds,
			}),
		{
			onSuccess: () => {
				queryClient.invalidateQueries(['freeSlots']);
				handleClose();
			},
		}
	);

	if (!!slotsIds?.length && !isUserLoggedIn()) {
		const returnUrl = location.pathname + location.search + location.hash;
		return <Navigate to={routesList.LOGIN + '?returnUrl=' + returnUrl} />;
	}

	return (
		<Dialog open={!!slotsIds} onClose={handleClose}>
			<DialogTitle>Confirm booking</DialogTitle>
			<DialogActions>
				<Button onClick={() => bookSlots()}>Confirm</Button>
				<Button onClick={handleClose}>Cancel</Button>
			</DialogActions>
		</Dialog>
	);
};
