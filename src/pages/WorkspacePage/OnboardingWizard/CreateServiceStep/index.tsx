import { Button, Stack, Typography } from '@mui/material';
import { ServiceForm } from '../../../../core/components/ServiceForm';
import { ICreateServiceStep } from './types';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { schema } from './schema';

export const CreateServiceStep = ({ onSubmit }: ICreateServiceStep) => {
	const { t } = useTranslation();
	const formik = useFormik({
		initialValues: {
			name: '',
			categoryGroupId: '',
			categoryId: '',
			descr: '',
			pricePack: [
				{
					duration: '15',
					price: '',
					currency: 'USD',
				},
			],
		},
		validationSchema: schema,
		onSubmit,
	});

	return (
		<>
			<Stack spacing={3}>
				<Typography fontWeight={600} variant='h4'>
					{t('Create service')}
				</Typography>
				<ServiceForm mode='create' handleFieldChange={formik.setFieldValue} values={formik.values} errors={formik.errors} />
			</Stack>
			<Button
				variant='contained'
				disableElevation
				size='large'
				sx={{
					alignSelf: 'flex-end',
					textTransform: 'none',
				}}
				onClick={() => formik.handleSubmit()}
			>
				{t('Continue')}
			</Button>
		</>
	);
};
