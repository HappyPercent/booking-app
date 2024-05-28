import { Stack, TextField, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { IFieldProps } from '../types';

export const NameField = ({ value, onChange, error }: IFieldProps) => {
	const { t } = useTranslation();
	return (
		<Stack spacing={1}>
			<Typography variant='body1' fontWeight={500}>
				{t('Service name')}
			</Typography>
			<TextField
				size='small'
				placeholder={t('Enter a service name')}
				autoFocus
				name='name'
				value={value}
				onChange={onChange}
				error={!!error}
				helperText={error}
			/>
		</Stack>
	);
};
