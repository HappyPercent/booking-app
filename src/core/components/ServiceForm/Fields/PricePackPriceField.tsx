import { Stack, TextField, Typography } from '@mui/material';
import { IFieldProps } from '../types';
import { useTranslation } from 'react-i18next';

export const PricePackPriceField = ({ value, onChange, error, index }: IFieldProps & { index: number }) => {
	const { t } = useTranslation();
	return (
		<Stack spacing={1} flexGrow={1} width={'100%'}>
			<Typography variant='body1' fontWeight={500}>
				{t('Price')}
			</Typography>
			<TextField
				size='small'
				name={`pricePack.[${index}].price`}
				placeholder={t('Enter price')}
				value={value}
				onChange={onChange}
				error={!!error}
				helperText={error}
			/>
		</Stack>
	);
};
