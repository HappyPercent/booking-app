import { FormControl, FormHelperText, MenuItem, Select, Stack, Typography } from '@mui/material';
import { IFieldProps } from '../types';
import { useTranslation } from 'react-i18next';
import { DURATION_OPTIONS } from '../constants';

export const PricePackDurationField = ({ value, onChange, error, index }: IFieldProps & { index: number }) => {
	const { t } = useTranslation();
	return (
		<Stack spacing={1} flexGrow={1} width={'100%'}>
			<Typography variant='body1' fontWeight={500}>
				{t('Duration')}
			</Typography>
			<FormControl error={!!error}>
				<Select
					displayEmpty
					size='small'
					renderValue={(value) => (value ? `${String(value)} min` : t('Enter duration'))}
					name={`pricePack.[${index}].duration`}
					value={value}
					onChange={onChange}
				>
					{DURATION_OPTIONS.map((option) => (
						<MenuItem key={option} value={option}>
							{option} min
						</MenuItem>
					))}
				</Select>
				{!!error && <FormHelperText>{error}</FormHelperText>}
			</FormControl>
		</Stack>
	);
};
