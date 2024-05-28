import { FormControl, FormHelperText, MenuItem, Select, Stack, Typography } from '@mui/material';
import { IFieldProps } from '../types';
import { useTranslation } from 'react-i18next';
import { useGetCategories } from '../../../hooks/useGetCategories';

export const CategoryField = ({ value, onChange, error }: IFieldProps) => {
	const { t } = useTranslation();
	const { data: categories } = useGetCategories();

	return (
		<Stack spacing={1}>
			<Typography variant='body1' fontWeight={500}>
				{t('Category')}
			</Typography>
			<FormControl error={!!error}>
				<Select
					displayEmpty
					size='small'
					renderValue={(value) => (value ? categories?.find(({ id }) => id === +value)?.name : t('Select a category'))}
					name='categoryGroupId'
					value={value}
					onChange={onChange}
					error={!!error}
				>
					{categories?.map((category) => (
						<MenuItem value={category.id}>{category.name}</MenuItem>
					))}
				</Select>
				{error && <FormHelperText>{error}</FormHelperText>}
			</FormControl>
		</Stack>
	);
};
