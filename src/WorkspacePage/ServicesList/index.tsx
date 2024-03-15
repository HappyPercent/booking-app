import { Button, IconButton, List, ListItem, Stack, Tooltip, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import InfoIcon from '@mui/icons-material/Info';
import { NewServiceDialog } from './NewServiceDialog';
import { useState } from 'react';
import { IService } from '../../core/constants/types';
import { useTranslation } from 'react-i18next';
import EditIcon from '@mui/icons-material/Edit';
import { INewServiceDialogProps } from './NewServiceDialog/types';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import api from '../../client/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const ServicesList = ({ data = [] }: { data: IService[] | undefined }) => {
	const [serviceDialogState, setServiceDialogState] = useState<INewServiceDialogProps['state']>({ open: false, edit: false, service: null });
	const { t } = useTranslation();
	const queryClient = useQueryClient();
	const { mutate: deleteService } = useMutation(api.deleteProposal, {
		onSuccess: () => {
			queryClient.invalidateQueries(['services']);
		},
	});

	const handleEditClick = (serviceId: number) => {
		setServiceDialogState({ open: true, edit: true, service: data.find((service) => service.id === serviceId) || null });
	};

	const handleSeleteServiceClick = (serviceId: number) => {
		deleteService(serviceId);
	};

	return (
		<>
			<NewServiceDialog state={serviceDialogState} onClose={() => setServiceDialogState({ open: false, edit: false, service: null })} />
			<List subheader={<Typography variant='h6'>{t('Services')}</Typography>}>
				{data.map((service) => (
					<ServiceListItem key={service.id} data={service} onEditClick={handleEditClick} onDeleteClick={handleSeleteServiceClick} />
				))}
				<Button
					sx={{
						marginTop: 1,
					}}
					color='primary'
					variant='contained'
					onClick={() => setServiceDialogState({ open: true, edit: false, service: null })}
					endIcon={<AddIcon />}
				>
					{t('Add service')}
				</Button>
			</List>
		</>
	);
};

const ServiceListItem = ({
	data,
	onEditClick,
	onDeleteClick,
}: {
	data: IService;
	onEditClick: (id: number) => void;
	onDeleteClick: (id: number) => void;
}) => {
	const { t } = useTranslation();
	return (
		<ListItem
			secondaryAction={
				<Tooltip
					title={
						<Stack direction='column' spacing={0}>
							<Stack direction={'row'} spacing={1}>
								<Typography variant={'body2'}>{t('Description')}:</Typography>
								<Typography variant={'body2'}>{data.shortDescr}</Typography>
							</Stack>
						</Stack>
					}
					placement='right'
				>
					<IconButton>
						<InfoIcon />
					</IconButton>
				</Tooltip>
			}
		>
			<Typography variant='body1'>{data.name}</Typography>
			<IconButton onClick={() => onEditClick(data.id)}>
				<EditIcon />
			</IconButton>
			<IconButton onClick={() => onDeleteClick(data.id)}>
				<DeleteOutlineIcon />
			</IconButton>
		</ListItem>
	);
};
