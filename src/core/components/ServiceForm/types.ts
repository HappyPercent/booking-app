import { SelectChangeEvent } from '@mui/material';

export interface IServiceFormProps {
	mode: 'create' | 'edit';
	onSubmit: (values: INewServiceFormData) => void;
	defaultValues?: INewServiceFormData;
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

export interface IFieldProps<T = string> {
	value: T;
	onChange: (e: { target: { name: string; value: T } }) => void;
	error?: string;
}
