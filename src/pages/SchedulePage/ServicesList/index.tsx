import { useState } from 'react';
import { IDesk, IService } from '../../../core/constants/types';
import { Collapse, List, ListItemButton, ListItemText, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { ISelectedPricePack } from '../types';

export const ServicesList = ({
	data,
	selectedPricePack,
	onSelect,
}: {
	data?: { desk: IDesk; proposal: IService }[];
	selectedPricePack?: ISelectedPricePack;
	onSelect: (data: ISelectedPricePack) => void;
}) => {
	const { t } = useTranslation();

	return (
		<List subheader={<Typography variant='h6'>{t('Services')}</Typography>}>
			{data?.map((serviceInfo) => (
				<ListItem data={serviceInfo} selectedPricePack={selectedPricePack} onSelect={onSelect} />
			))}
		</List>
	);
};

const ListItem = ({
	data,
	selectedPricePack,
	onSelect,
}: {
	data: { desk: IDesk; proposal: IService };
	selectedPricePack?: ISelectedPricePack;
	onSelect: (data: ISelectedPricePack) => void;
}) => {
	const { desk, proposal } = data;
	const [open, setOpen] = useState(false);
	const { t } = useTranslation();

	if (!proposal) return null;
	return (
		<>
			<ListItemButton key={`${desk.id}_${proposal.id}`} onClick={() => setOpen((state) => !state)}>
				<ListItemText primary={`${desk.name} - ${proposal.name}`} />
				{open ? <ExpandLess /> : <ExpandMore />}
			</ListItemButton>
			<Collapse in={open} timeout='auto' unmountOnExit>
				<List component='div' disablePadding>
					{proposal.pricePack?.map((pack) => (
						<ListItemButton
							sx={{ pl: 4 }}
							selected={
								selectedPricePack?.pricePack.id === pack.id && desk.id === selectedPricePack.deskId && proposal.id === selectedPricePack.proposalId
							}
							onClick={() => onSelect({ deskId: desk.id, proposalId: proposal.id, pricePack: pack })}
						>
							<ListItemText>
								{pack.duration} {t('minutes')} - {pack.price} {pack.currency}
							</ListItemText>
						</ListItemButton>
					))}
				</List>
			</Collapse>
		</>
	);
};
