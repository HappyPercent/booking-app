import { Stack, TextField, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { IFieldProps } from '../../ServiceForm/types';

export const NameField = ({ value, onChange, error }: IFieldProps) => {
	const { t } = useTranslation();
	return (
		<Stack spacing={1}>
			<Typography variant='body1' fontWeight={500}>
				{t('Desk name')}
			</Typography>
			<TextField
				size='small'
				placeholder={t('Enter a desk name')}
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
