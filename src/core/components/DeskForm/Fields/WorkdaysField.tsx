import { Box, Chip, Stack, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { IFieldProps } from '../../ServiceForm/types';
import { WEEKDAYS } from '../constants';

export const WorkdaysField = ({ value, onChange }: IFieldProps<number[] | undefined>) => {
	const { t } = useTranslation();

	const handleChipClick = (day: number) => {
		if (value?.includes(day)) {
			onChange({ target: { name: 'schedule.workingDays', value: value?.filter((item) => item !== day) } });
		} else {
			onChange({ target: { name: 'schedule.workingDays', value: [...(value || []), day] } });
		}
	};
	return (
		<Stack spacing={2}>
			<Typography variant='body1' fontWeight={500}>
				{t('Working days')}
			</Typography>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'row',
					gap: 1,
					flexWrap: 'wrap',
				}}
			>
				{Object.entries(WEEKDAYS).map(([key, { label }]) => (
					<Chip
						onClick={() => handleChipClick(Number(key))}
						key={key}
						label={label}
						variant={'filled'}
						clickable
						color={value?.includes(Number(key)) ? 'secondary' : 'primary'}
					/>
				))}
			</Box>
		</Stack>
	);
};
