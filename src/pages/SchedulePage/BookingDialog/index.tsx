import { Dialog } from '@mui/material';
import { Navigate, useLocation, useSearchParams } from 'react-router-dom';
import { isUserLoggedIn } from '../../../core/helpers/isUserLoggedIn';
import { routesList } from '../../../routes/routesList';
import { useEffect, useState } from 'react';

export const BookingDialog = ({ data }: { data: { ownerId: string; deskId: string; proposakId: string; pricePackId: string } }) => {
	const [query] = useSearchParams();
	const queryBooking = query.get('booking');
	const location = useLocation();
	const [slotsIds, setSlotsIds] = useState<string[]>();

	useEffect(() => {
		try {
			const bookingData = queryBooking ? JSON.parse(queryBooking) : null;
			console.log('bookingData: ', bookingData);
			setSlotsIds(bookingData?.slotsIds);
		} catch (e) {
			console.error('Failed to parse booking data', e);
		}
	}, [queryBooking]);

	if (!!slotsIds && !isUserLoggedIn()) {
		const returnUrl = location.pathname + location.search + location.hash;
		return <Navigate to={routesList.LOGIN + '?returnUrl=' + returnUrl} />;
	}

	return <Dialog open={!!slotsIds}>BookingDialog</Dialog>;
};
