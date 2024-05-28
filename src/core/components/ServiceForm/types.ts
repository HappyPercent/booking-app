import { SelectChangeEvent } from '@mui/material';
import { FormikErrors } from 'formik';

export interface IServiceFormProps {
	mode: 'create' | 'edit';
	handleFieldChange: (field: string, value: any) => void;
	values: INewServiceFormData;
	errors: FormikErrors<INewServiceFormData>;
}

export interface ISubcategorySelectProps {
	categoryId: string;
	value: string;
	onChange: (e: SelectChangeEvent<string>) => void;
	error?: string;
}

export interface INewServiceFormData {
	name: string;
	categoryGroupId: string;
	categoryId: string;
	shortDescr?: string;
	descr: string;
	pricePack: {
		duration: string;
		price: string;
		currency: string;
	}[];
}

export interface IFieldProps {
	value: string;
	onChange: (e: React.ChangeEvent<any> | SelectChangeEvent<string>) => void;
	error?: string;
}
