import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import api from '../../../../client/api';
import { FormControl, FormHelperText, MenuItem, Select, Stack, Typography } from '@mui/material';
import { IFieldProps } from '../types';

export const SubcategoryField = ({ categoryId, value, onChange, error }: IFieldProps & { categoryId: string }) => {
	const { t } = useTranslation();
	const { data: subcategories } = useQuery(['subcategories', categoryId], async () => (await api.getCategoryChildByRootId(categoryId)).data, {
		enabled: !!categoryId,
		select: (data) => data.data?.content,
	});
	return (
		<Stack spacing={1}>
			<Typography variant='body1' fontWeight={500}>
				{t('Subcategory')}
			</Typography>
			<FormControl error={!!error}>
				<Select
					displayEmpty
					size='small'
					renderValue={(value) => (value ? subcategories?.find(({ id }) => id === +value)?.name : t('Select a subcategory'))}
					onChange={onChange}
					value={value}
					name='categoryId'
				>
					{subcategories?.map((category) => (
						<MenuItem key={category.id} value={category.id}>
							{category.name}
						</MenuItem>
					))}
				</Select>
				{!!error && <FormHelperText>{error}</FormHelperText>}
			</FormControl>
		</Stack>
	);
};
