import { Autocomplete, Stack, TextField, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { IFieldProps } from '../../ServiceForm/types';
import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import api from '../../../../client/api';
import { ICountry } from '../../../constants/types';

export const CityField = ({
	value,
	onChange,
	error,
	countryId,
}: IFieldProps<{ label: string; id: number; name: string; country: ICountry } | null> & { countryId?: number }) => {
	const { t } = useTranslation();
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
		<Stack spacing={1}>
			<Typography variant='body1' fontWeight={500}>
				{t('City')}
			</Typography>
			<Autocomplete
				size='small'
				onChange={(e, value) => onChange({ ...e, target: { name: 'city', value } })}
				loading={isFetching}
				value={value}
				isOptionEqualToValue={(option, value) => option.id === value?.id}
				options={citiesOptions}
				renderInput={(params: any) => <TextField {...params} error={error} />}
			/>
		</Stack>
	);
};
