import { MenuItem, Select, Stack, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { IFieldProps } from '../../ServiceForm/types';
import { getWorkingTimeOptions } from '../helpers/getWorkingTimeOptions';
import { useEffect } from 'react';

export const WorkEndField = ({ value, onChange, workStartValue }: IFieldProps<string | undefined> & { workStartValue?: string }) => {
	const { t } = useTranslation();
	const options = getWorkingTimeOptions();

	useEffect(() => {
		console.log('workStartValue: ', workStartValue);
		if (value && workStartValue && new Date(workStartValue) > new Date(value)) {
			onChange({ target: { name: 'schedule.workingHours.from', value: workStartValue } });
		}
	}, [workStartValue, value, onChange]);

	return (
		<Stack spacing={1}>
			<Typography variant='body1' fontWeight={500}>
				{t('Work ends')}
			</Typography>
			<Select name='schedule.workingHours.to' size='small' value={String(value)} onChange={onChange}>
				{options.map((option) => (
					<MenuItem key={String(option.value)} value={String(option.value)}>
						{option.label}
					</MenuItem>
				))}
			</Select>
		</Stack>
	);
};
