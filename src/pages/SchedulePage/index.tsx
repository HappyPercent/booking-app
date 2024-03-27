import { Box, Grid } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useGetDeskByOwner } from '../../core/hooks/useGetDeskByOwner';
import { ServicesList } from './ServicesList';
import { useEffect, useState } from 'react';
import { ISelectedPricePack } from './types';
import { SlotsPicker } from './SlotsPicker';
import { useGetDeskById } from '../../core/hooks/useGetDeskById';
import { BookingDialog } from './BookingDialog';

export default function SchedulePage() {
	const { ownerId, deskId, serviceId, packId } = useParams();
	const { data: dataByOwner, isFetching: isOwnerLoading } = useGetDeskByOwner(ownerId as string);
	const { data: dataById, isFetching: isDeskLoading } = useGetDeskById(deskId as string);
	const [selectedPack, setSelectedPack] = useState<ISelectedPricePack | undefined>(
		deskId && serviceId && packId ? { deskId: Number(deskId), proposalId: Number(serviceId), pricePack: { id: Number(packId) } } : undefined
	);

	useEffect(() => {
		if (deskId && serviceId && packId) {
			setSelectedPack({ deskId: Number(deskId), proposalId: Number(serviceId), pricePack: { id: Number(packId) } });
		}
	}, [deskId, packId, serviceId]);

	if (isOwnerLoading || isDeskLoading) return <div>Loading...</div>;

	return (
		<>
			<BookingDialog
				data={{
					ownerId: ownerId as string,
					deskId: deskId as string,
					proposakId: serviceId as string,
					pricePackId: packId as string,
				}}
			/>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'row',
					alignItems: 'center',
					alignContent: 'center',
					justifyContent: 'center',
					flexGrow: 1,
				}}
			>
				<Grid
					container
					spacing={2}
					sx={{
						border: 1,
					}}
				>
					<Grid
						item
						xs={6}
						lg={3}
						sx={{
							borderRight: 1,
						}}
					>
						{!(deskId && serviceId && packId) && (
							<ServicesList data={dataById || dataByOwner} onSelect={setSelectedPack} selectedPricePack={selectedPack} />
						)}
					</Grid>
					<Grid
						sx={{
							paddingBottom: 2,
							overflow: 'auto',
						}}
						item
						xs={6}
						lg={9}
					>
						{!!selectedPack && <SlotsPicker selectedPack={selectedPack} />}
					</Grid>
				</Grid>
			</Box>
		</>
	);
}
