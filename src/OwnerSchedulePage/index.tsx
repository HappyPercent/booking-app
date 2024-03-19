import { Box, Grid } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useGetDeskByOwner } from '../core/hooks/useGetDeskByOwner';
import { ServicesList } from './ServicesList';
import { useState } from 'react';
import { ISelectedPricePack } from './types';
import { SlotsPicker } from './SlotsPicker';

export default function OwnerSchedulePage() {
	const { ownerId } = useParams();
	const { data, isLoading } = useGetDeskByOwner(ownerId as string);
	const [selectedPack, setSelectedPack] = useState<ISelectedPricePack | undefined>();

	if (isLoading) return <div>Loading...</div>;

	return (
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
					<ServicesList data={data} onSelect={setSelectedPack} selectedPricePack={selectedPack} />
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
					<SlotsPicker selectedPack={selectedPack} />
				</Grid>
			</Grid>
		</Box>
	);
}
