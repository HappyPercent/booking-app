import { FormControl, FormHelperText, MenuItem, Select, Stack, TextField, Typography } from '@mui/material';
import { IFieldProps } from '../types';
import { useTranslation } from 'react-i18next';
import { useCurrencyAll } from '../../../hooks/useCurrencyAll';

export const PricePackCurrencyField = ({ value, onChange, error, index }: IFieldProps & { index: number }) => {
	const { t } = useTranslation();
	const { data: currency } = useCurrencyAll();

	return (
		<Stack spacing={1} flexGrow={1} width={'100%'}>
			<Typography variant='body1' fontWeight={500}>
				{t('Currency')}
			</Typography>
			<FormControl error={!!error}>
				<Select
					displayEmpty
					size='small'
					renderValue={(value) => (value ? String(value) : t('Enter currency'))}
					name={`pricePack.[${index}].currency`}
					value={value}
					onChange={onChange}
					error={!!error}
				>
					{currency?.data?.map((currency) => (
						<MenuItem key={currency.code} value={currency.code}>
							{currency.code}
						</MenuItem>
					))}
				</Select>
				{!!error && <FormHelperText>{error}</FormHelperText>}
			</FormControl>
		</Stack>
	);
};
