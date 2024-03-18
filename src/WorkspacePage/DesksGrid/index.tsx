import { Button, Divider, IconButton, List, ListItem, MenuItem, Select, Stack, Typography } from '@mui/material';
import { IDesk, IService } from '../../core/constants/types';
import { useMemo, useState } from 'react';
import { DeskDialog } from './DeskDialog';
import { useGetServices } from '../../core/hooks/useGetServices';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../../client/api';
import { useTranslation } from 'react-i18next';
import CloseIcon from '@mui/icons-material/Close';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';

export const DesksGrid = ({
	data = [],
	onDeskClick,
	selectedDesk,
}: {
	data: { [key in IDesk['id']]: { desk: IDesk; proposals: IService[] } };
	onDeskClick: (deskId: number) => void;
	selectedDesk: number | null;
}) => {
	const queryClient = useQueryClient();
	const [deskDialogState, setDeskDialogState] = useState<{ open: boolean; edit?: boolean; desk?: IDesk }>({
		open: false,
	});
	const { t } = useTranslation();

	const { mutate: deleteServiceLink } = useMutation(
		(data: { proposalId: number; deskId: number }) => api.deleteProposalLink(data.proposalId, data.deskId),
		{
			onSuccess: () => queryClient.invalidateQueries(['desks']),
		}
	);

	const { mutate: deleteDesk } = useMutation(api.deleteDesk, {
		onSuccess: () => queryClient.invalidateQueries(['desks']),
	});

	const handleEditClick = (deskId: number) => {
		setDeskDialogState({ open: true, edit: true, desk: data[deskId].desk });
	};

	return (
		<>
			<DeskDialog state={deskDialogState} onClose={() => setDeskDialogState({ open: false })} />
			<Stack direction={'row'} spacing={1} divider={<Divider orientation='vertical' flexItem />} display={'-webkit-box'}>
				{Object.values(data).map((item) => (
					<Stack spacing={1} divider={<Divider />} width={150}>
						<Stack direction={'row'} spacing={1}>
							<Typography
								style={{ cursor: 'pointer' }}
								color={item.desk.id === selectedDesk ? 'primary' : ''}
								variant='h6'
								onClick={() => onDeskClick(item.desk.id)}
							>
								{item.desk.name}
							</Typography>
							<IconButton onClick={() => handleEditClick(item.desk.id)}>
								<EditIcon />
							</IconButton>
							<IconButton onClick={() => deleteDesk(item.desk.id)}>
								<DeleteOutlineIcon />
							</IconButton>
						</Stack>
						{!!item.proposals?.length && (
							<List>
								{item.proposals?.map((proposal) => (
									<ListItem
										secondaryAction={
											<IconButton
												onClick={() =>
													deleteServiceLink({
														proposalId: proposal.id,
														deskId: item.desk.id,
													})
												}
											>
												<CloseIcon />
											</IconButton>
										}
									>
										{proposal?.name || ''}
									</ListItem>
								))}
							</List>
						)}
						<LinkProposalButton deskId={item.desk.id} services={item.proposals} />
					</Stack>
				))}
				<Button
					sx={{
						marginLeft: 2,
						alignSelf: 'baseline',
					}}
					variant='contained'
					onClick={() => setDeskDialogState({ open: true })}
				>
					{t('New desk')}
				</Button>
			</Stack>
		</>
	);
};

const LinkProposalButton = ({ deskId, services }: { deskId: number; services: IService[] }) => {
	const queryClient = useQueryClient();
	const [isLinking, setIsLinking] = useState(false);
	const { data } = useGetServices();
	const avaliableServices = useMemo(() => data?.filter(({ id }) => !services.find((service) => service?.id === id)), [data, services]);
	const { mutate } = useMutation((proposalId: number) => api.linkProposalToDesk(proposalId, deskId), {
		onSuccess: () => {
			setIsLinking(false);
			queryClient.invalidateQueries(['desks']);
		},
	});
	const { t } = useTranslation();

	const handleClick = (serviceId: number | undefined) => {
		if (serviceId) {
			mutate(serviceId);
		}
	};

	if (isLinking) {
		return (
			<Select>
				{avaliableServices?.map((service) => (
					<MenuItem onClick={() => handleClick(service.id)}>{service.name}</MenuItem>
				))}
			</Select>
		);
	}

	return (
		<Button onClick={() => setIsLinking(true)} variant='outlined' size='small' disabled={!avaliableServices?.length}>
			{t('Link proposal')}
		</Button>
	);
};
