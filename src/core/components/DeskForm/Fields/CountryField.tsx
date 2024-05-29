import { Autocomplete, Stack, TextField, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { IFieldProps } from '../../ServiceForm/types';
import { useQuery } from '@tanstack/react-query';
import api from '../../../../client/api';
import { ICountry } from '../../../constants/types';
import { useMemo } from 'react';

export const CountryField = ({ value, onChange, error }: IFieldProps<{ label: string; id: number } | null>) => {
	const { t } = useTranslation();
	const { data: countries } = useQuery(['countries'], api.getAllCountries, {
		select: (data) => data.data?.data?.content,
	});

	const countriesOptions = useMemo(
		() =>
			countries?.map((country: ICountry) => ({
				label: country.name,
				id: country.id,
			})) || [],
		[countries]
	);

	return (
		<Stack spacing={1}>
			<Typography variant='body1' fontWeight={500}>
				{t('Country')}
			</Typography>
			<Autocomplete
				size='small'
				onChange={(e, value) => onChange({ ...e, target: { name: 'country', value } })}
				isOptionEqualToValue={(option, value) => option.id === value?.id}
				value={value}
				options={countriesOptions}
				renderInput={(params: any) => <TextField {...params} error={!!error} name='country' />}
			/>
		</Stack>
	);
};
