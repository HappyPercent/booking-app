import { Button, Card, Stack, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import AddIcon from '@mui/icons-material/Add';
import { IServiceFormProps } from './types';
import { FormikErrors, FormikValues, useFormik } from 'formik';
import { NameField } from './Fields/NameField';
import { CategoryField } from './Fields/CategoryField';
import { SubcategoryField } from './Fields/SubcategoryField';
import { DescriptionField } from './Fields/DescriptionField';
import { PricePackDurationField } from './Fields/PricePackDurationField';
import { PricePackPriceField } from './Fields/PricePackPriceField';
import { PricePackCurrencyField } from './Fields/PricePackCurrencyField';
import { schema } from './schema';

export const ServiceForm = ({ mode, onSubmit, defaultValues }: IServiceFormProps) => {
	const { t } = useTranslation();
	const create = mode === 'create';
	const { errors, values, setFieldValue, handleSubmit } = useFormik({
		initialValues: defaultValues || {
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
		validateOnChange: false,
		validationSchema: schema,
		onSubmit,
	});

	const onChange = (e: { target: { name: string; value: any } }) => {
		setFieldValue(e.target.name, e.target.value);
	};

	return (
		<>
			<Stack spacing={3}>
				<Typography fontWeight={600} variant='h4'>
					{t('Create service')}
				</Typography>
				<Stack spacing={3}>
					<Stack spacing={2}>
						{create && (
							<Typography color={({ palette }) => palette.custom['mid-grey']} variant='body1'>
								{t('Let’s begin from specifying your service.')}
							</Typography>
						)}
						<Card
							elevation={0}
							sx={{
								padding: '20px',
							}}
						>
							<Stack spacing={2}>
								<NameField value={values.name} onChange={onChange} error={errors.name} />
								<CategoryField
									value={values.categoryGroupId}
									onChange={(e) => {
										onChange(e);
										setFieldValue('categoryId', '');
									}}
									error={errors.categoryGroupId}
								/>
								<SubcategoryField categoryId={values.categoryGroupId} value={values.categoryId} onChange={onChange} error={errors.categoryId} />
								<DescriptionField value={values.descr} onChange={onChange} error={errors.descr} />
							</Stack>
						</Card>
					</Stack>
					<Stack spacing={2}>
						{create && (
							<Typography color={({ palette }) => palette.custom['mid-grey']} variant='body1'>
								{t('Add a price pack(s) setting the duration of a procedure.')}
							</Typography>
						)}
						{values.pricePack.map((pricePack, index) => (
							<Card
								elevation={0}
								sx={{
									padding: '20px',
									display: 'flex',
									flexDirection: 'column',
									gap: '20px',
								}}
							>
								<Stack spacing={2} direction={'row'} width={'100%'}>
									<PricePackDurationField
										value={pricePack.duration}
										onChange={onChange}
										error={(errors.pricePack?.[index] as FormikErrors<FormikValues>)?.duration as string}
										index={index}
									/>
									<PricePackPriceField
										value={pricePack.price}
										onChange={onChange}
										error={(errors.pricePack?.[index] as FormikErrors<FormikValues>)?.price as string}
										index={index}
									/>
									<PricePackCurrencyField
										value={pricePack.currency}
										onChange={onChange}
										error={(errors.pricePack?.[index] as FormikErrors<FormikValues>)?.currency as string}
										index={index}
									/>
								</Stack>
								{index > 0 && (
									<Button
										color='secondary'
										size='small'
										sx={{ textTransform: 'none', alignSelf: 'flex-end', fontSize: '16px', fontWeight: 600 }}
										onClick={() =>
											setFieldValue(
												'pricePack',
												values.pricePack.filter((_, i) => i !== index)
											)
										}
									>
										{t('Delete')}
									</Button>
								)}
							</Card>
						))}
					</Stack>
					<Button
						color='secondary'
						size='small'
						startIcon={<AddIcon />}
						variant='text'
						sx={{ textTransform: 'none', alignSelf: 'flex-start', fontSize: '16px', fontWeight: 600 }}
						onClick={() => setFieldValue('pricePack', [...values.pricePack, { duration: '15', price: '', currency: 'USD' }])}
					>
						{t('Add price pack')}
					</Button>
				</Stack>
			</Stack>
			<Button
				variant='contained'
				disableElevation
				size='large'
				sx={{
					alignSelf: 'flex-end',
					textTransform: 'none',
				}}
				onClick={() => handleSubmit()}
			>
				{t('Continue')}
			</Button>
		</>
	);
};
