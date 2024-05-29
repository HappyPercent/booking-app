import { Card, Chip, Divider, Stack, Typography } from '@mui/material';
import { IServiceCardProps } from './types';

export const ServiceCard = ({ service }: IServiceCardProps) => {
	return (
		<Card
			sx={{
				padding: '20px',
			}}
		>
			<Stack spacing={2}>
				<Typography variant='body1' fontWeight={600}>
					{service.name}
				</Typography>
				<Divider />
				{(!!service.category?.name || !!service.category?.root?.name) && (
					<Stack spacing={1} direction='row'>
						<Typography variant='body1' color={({ palette }) => palette.custom['mid-grey']}>
							{service.category?.name}
						</Typography>
						<Typography variant='body1' color={({ palette }) => palette.custom['mid-grey']}>
							{service.category?.root?.name}
						</Typography>
					</Stack>
				)}
				{!!service.descr && <Typography variant='body1'>{service.descr}</Typography>}
				{!!service.pricePack?.length && (
					<Stack spacing={1} direction='row'>
						{service.pricePack?.map((pricePack) => (
							<Chip
								variant='filled'
								key={pricePack.id}
								label={`${pricePack.duration} min, ${pricePack.price} ${pricePack.currency}`}
								sx={({ palette }) => ({ background: palette.custom['light-grey'], borderRadius: '8px' })}
							/>
						))}
					</Stack>
				)}
			</Stack>
		</Card>
	);
};
