import { Box, Button, Card, CircularProgress, Stack, Typography } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { NameField } from './Fields/NameField';
import { IDeskDialogProps } from './types';
import { DEFAULT_FORM_VALUES } from './constants';
import { IFieldProps } from '../ServiceForm/types';
import { CountryField } from './Fields/CountryField';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { CityField } from './Fields/CityField';
import { WorkdaysField } from './Fields/WorkdaysField';
import { WorkStartField } from './Fields/WorkStartField';
import { WorkEndField } from './Fields/WorkEndField';
import { ServiceCard } from '../ServiceCard';
import { useGetCategories } from '../../hooks/useGetCategories';

const schema = Yup.object().shape({
	name: Yup.string().required('Required'),
	country: Yup.object().required('Required'),
	city: Yup.object().required('Required'),
});

export const DeskForm = ({ mode, onSubmit, onBack, linkedServices, isLoading }: IDeskDialogProps) => {
	const { t } = useTranslation();
	const create = mode === 'create';
	const { data: categories } = useGetCategories();
	const { values, errors, handleSubmit, setFieldValue } = useFormik({
		initialValues: DEFAULT_FORM_VALUES,
		validationSchema: schema,
		enableReinitialize: true,
		validateOnChange: false,
		onSubmit,
	});

	const onChange: IFieldProps<any>['onChange'] = (e) => {
		setFieldValue(e.target.name, e.target.value);
	};

	return (
		<>
			{onBack ? (
				<Button
					sx={{
						position: 'fixed',
						top: '40px',
						left: '40px',
						textTransform: 'none',
					}}
					onClick={onBack}
					variant='text'
					color='secondary'
					startIcon={<ArrowBackIcon />}
				>
					{t('Back')}
				</Button>
			) : null}
			<Stack spacing={3}>
				<Typography fontWeight={600} variant='h4'>
					{t('Create desk')}
				</Typography>
				<Stack spacing={3}>
					<Stack spacing={2}>
						{create && (
							<Typography color={({ palette }) => palette.custom['mid-grey']} variant='body1'>
								{t('Desk is a schedule your clients will see to book a service.')}
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
								<Stack spacing={2} direction={'row'} width={'100%'}>
									<Box flexGrow={1} width={'100%'}>
										<CountryField onChange={onChange} value={values.country} />
									</Box>
									<Box flexGrow={1} width={'100%'}>
										<CityField onChange={onChange} value={values.city} countryId={values.country?.id} />
									</Box>
								</Stack>
							</Stack>
						</Card>
					</Stack>
					<Stack spacing={2}>
						{create && (
							<Typography color={({ palette }) => palette.custom['mid-grey']} variant='body1'>
								{t('Specify your working hours.')}
							</Typography>
						)}
						<Card
							elevation={0}
							sx={{
								padding: '20px',
								display: 'flex',
								flexDirection: 'column',
								gap: '20px',
							}}
						>
							<Stack spacing={2}>
								<WorkdaysField value={values.schedule?.workingDays} onChange={onChange} />
								<Stack spacing={2} direction={'row'} width={'100%'}>
									<Box flexGrow={1} width={'100%'}>
										<WorkStartField value={values.schedule?.workingHours.from} workEndValue={values.schedule?.workingHours.to} onChange={onChange} />
									</Box>
									<Box flexGrow={1} width={'100%'}>
										<WorkEndField value={values.schedule?.workingHours.to} workStartValue={values.schedule?.workingHours.to} onChange={onChange} />
									</Box>
								</Stack>
								<Button
									variant='text'
									color='secondary'
									sx={{
										textTransform: 'none',
										alignSelf: 'flex-start',
									}}
								>
									{t('See calendar (WIP)')}
								</Button>
							</Stack>
						</Card>
					</Stack>
					<Stack spacing={2}>
						{create && (
							<Typography color={({ palette }) => palette.custom['mid-grey']} variant='body1'>
								{t('The desk is connected to this service, you can unlink it later. ')}
							</Typography>
						)}
						{!!linkedServices?.length &&
							linkedServices.map((service) => (
								<ServiceCard
									service={{
										...service,
										id: 0,
										pricePack: service.pricePack?.map((pack) => ({ ...pack, id: 0, duration: +pack.duration, price: +pack.duration })),
										category: categories?.find(({ id }) => id === +service.categoryGroupId),
									}}
								/>
							))}
					</Stack>
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
				{isLoading ? <CircularProgress size={24} /> : t('Continue')}
			</Button>
		</>
	);
};
