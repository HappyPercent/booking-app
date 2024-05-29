import { MenuItem, Select, Stack, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { IFieldProps } from '../../ServiceForm/types';
import { getWorkingTimeOptions } from '../helpers/getWorkingTimeOptions';
import { useEffect } from 'react';

export const WorkStartField = ({ value, onChange, workEndValue }: IFieldProps<string | undefined> & { workEndValue?: string }) => {
	const { t } = useTranslation();
	const options = getWorkingTimeOptions();

	useEffect(() => {
		if (value && workEndValue && new Date(workEndValue) < new Date(value)) {
			onChange({ target: { name: 'schedule.workingHours.from', value: workEndValue } });
		}
	}, [workEndValue, value, onChange]);

	return (
		<Stack spacing={1}>
			<Typography variant='body1' fontWeight={500}>
				{t('Work starts')}
			</Typography>
			<Select size='small' name='schedule.workingHours.from' value={String(value)} onChange={onChange}>
				{options.map((option) => (
					<MenuItem key={String(option.value)} value={String(option.value)}>
						{option.label}
					</MenuItem>
				))}
			</Select>
		</Stack>
	);
};
