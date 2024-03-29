import { Autocomplete, Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField } from '@mui/material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useEffect, useMemo, useState } from 'react';
import { ICity, ICountry } from '../../../../core/constants/types';

import { WorkTimePicker } from '../../WorkTimePicker';
import { DEFAULT_WORKING_DAYS } from '../../constants';
import startOfToday from 'date-fns/startOfToday';
import addWeeks from 'date-fns/addWeeks';
import { IDeskDialogProps, IDeskFormValues } from './types';
import api from '../../../../client/api';
import { useTranslation } from 'react-i18next';
import { getEvents } from '../../WorkTimePicker/helpers/getEvents';

const schema = Yup.object().shape({
	name: Yup.string().required('Required'),
	country: Yup.object().required('Required'),
	city: Yup.object().required('Required'),
});

const defaultValues = {
	name: '',
	country: null,
	city: null,
	schedule: {
		workingDays: Object.values(DEFAULT_WORKING_DAYS).map((day) => Number(day)),
		workingPeriod: {
			from: startOfToday(),
			to: addWeeks(startOfToday(), 2),
		},
		workingHours: {
			from: new Date('2023-03-27T09:00:00'),
			to: new Date('2023-03-27T18:00:00'),
		},
		breaks: [],
		detail: false,
	},
} as IDeskFormValues;

export const DeskDialog = ({ state, onClose }: IDeskDialogProps) => {
	const { t } = useTranslation();
	const queryClient = useQueryClient();
	const [initialValues, setInitialValues] = useState<IDeskFormValues>(defaultValues);
	const { mutate: createDesk } = useMutation(
		async (values: {
			name: string;
			cityId: number;
			countryId: number;
			schedule: {
				dateTimeStart: string;
				dateTimeEnd: string;
			}[];
		}) => {
			const response = await api.createDesk({
				cityId: values.cityId,
				countryId: values.countryId,
				name: values.name,
			});
			await api.createSlotsForDesk(Number(response.data.data), values.schedule);
		},
		{
			onSuccess: () => {
				onClose();
				queryClient.invalidateQueries(['desks']);
			},
		}
	);
	const { mutate: updateDesk } = useMutation(api.editDesk, {
		onSuccess: () => {
			onClose();
			queryClient.invalidateQueries(['desks']);
		},
	});

	const { data: countries } = useQuery(['countries'], api.getAllCountries, {
		enabled: state.open,
		select: (data) => data.data?.data?.content,
	});

	useEffect(() => {
		(async () => {
			if (state.edit && countries?.length && state.desk) {
				const country = countries.find((country) => country.name === state.desk?.country) as ICountry;
				const cities = (await api.getCityByCountry(String(country.id))).data.data?.content;
				const city = cities?.find((city) => city.name === state.desk?.city) as ICity;
				setInitialValues({
					name: state.desk?.name || '',
					country: { ...country, label: country?.name } || null,
					city: { ...city, label: city.name } || null,
				});
			}
		})();
	}, [state.edit, state.desk, countries]);

	const countriesOptions = useMemo(
		() =>
			countries?.map((country: ICountry) => ({
				label: country.name,
				id: country.id,
			})) || [],
		[countries]
	);
	const handleSubmit = (values: IDeskFormValues) => {
		if (values.city?.id && values.country?.id) {
			if (state.edit && state.desk?.id) {
				const data = {
					id: state.desk?.id,
					name: values.name,
					cityId: values.city.id,
					countryId: values.country.id,
				};
				updateDesk(data);
			} else {
				const data = {
					name: values.name,
					cityId: values.city.id,
					countryId: values.country.id,
					schedule: (values.schedule?.events?.length ? values.schedule.events : getEvents(values.schedule))?.map((event) => ({
						dateTimeStart: new Date(event.startStr).toISOString(),
						dateTimeEnd: new Date(event.endStr).toISOString(),
					})),
				};
				if (data.schedule) {
					createDesk(data);
				}
			}
		}
	};

	return (
		<Dialog open={state.open} onClose={onClose} fullWidth maxWidth={'xl'}>
			<DialogTitle>
				{state.edit ? t('Edit') : t('New')} {t('desk')}
			</DialogTitle>
			<Formik initialValues={initialValues} enableReinitialize onSubmit={handleSubmit} validationSchema={schema}>
				{({ values, errors, touched, handleChange, handleSubmit, setFieldValue }) => (
					<DialogContent
						sx={{
							overflow: 'visible',
						}}
					>
						<Stack direction={'column'} spacing={3}>
							<TextField label={t('Name')} onChange={handleChange} value={values.name} name='name' error={!!touched.name && !!errors.name} />
							<Autocomplete
								onChange={(_, value) => {
									setFieldValue('country', value);
									if (values.city?.country?.id !== value?.id) {
										setFieldValue('city', null);
									}
								}}
								value={values.country}
								isOptionEqualToValue={(option, value) => option.id === value?.id}
								options={countriesOptions}
								renderInput={(params: any) => <TextField {...params} error={!!touched.country && !!errors.country} label={t('Country')} />}
							/>
							<CitySelect
								label={t('City')}
								value={values.city}
								countryId={values.country?.id}
								onChange={(value) => {
									setFieldValue('city', value);
								}}
								error={!!touched.city && !!errors.city}
							/>
							{!!values.schedule && !state.edit && (
								<WorkTimePicker value={values.schedule} onChange={(schedule: typeof defaultValues.schedule) => setFieldValue('schedule', schedule)} />
							)}
						</Stack>
						<DialogActions
							sx={{
								marginTop: 2,
							}}
						>
							<Button onClick={onClose}>{t('Cancel')}</Button>
							<Button onClick={() => handleSubmit()} color='primary' variant='contained'>
								{state.edit ? t('Save') : t('Create')}
							</Button>
						</DialogActions>
					</DialogContent>
				)}
			</Formik>
		</Dialog>
	);
};

const CitySelect = ({
	label,
	countryId,
	value,
	onChange,
	error,
}: {
	label: string;
	countryId?: number;
	value: ICity | null;
	onChange: (value: ICity | null) => void;
	error: boolean;
}) => {
	const { data: cities, isFetching } = useQuery(['citiesByCountry', countryId], async () => (await api.getCityByCountry(String(countryId))).data, {
		enabled: !!countryId,
		select: (data) => data.data?.content,
	});
	const citiesOptions = useMemo(
		() =>
			cities?.map((city) => ({
				...city,
				label: city.name,
				id: city.id,
			})) || [],
		[cities]
	);

	return (
		<Autocomplete
			onChange={(_, value) => onChange(value)}
			loading={isFetching}
			value={value}
			isOptionEqualToValue={(option, value) => option.id === value?.id}
			options={citiesOptions}
			renderInput={(params: any) => <TextField {...params} error={error} label={label} />}
		/>
	);
};
