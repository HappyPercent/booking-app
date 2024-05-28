import { Stack, TextField, Typography } from '@mui/material';
import { IFieldProps } from '../types';
import { useTranslation } from 'react-i18next';

export const DescriptionField = ({ value, onChange, error }: IFieldProps) => {
	const { t } = useTranslation();

	return (
		<Stack spacing={1}>
			<Stack direction='row'>
				<Typography variant='body1' fontWeight={500}>
					{t('Description')}&nbsp;
				</Typography>
				<Typography variant='body1'>{t('(optional)')}</Typography>
			</Stack>
			<TextField
				size='small'
				multiline
				placeholder={t('Add a service description to help your clients learn more about you')}
				rows={3}
				name='descr'
				value={value}
				onChange={onChange}
			/>
		</Stack>
	);
};
