import { ICity, ICountry, IService } from '../../constants/types';
import { INewServiceFormData } from '../ServiceForm/types';

export interface IDeskDialogProps {
	mode: 'create' | 'edit';
	onSubmit: (values: IDeskFormValues) => void;
	onBack: () => void;
	linkedServices?: INewServiceFormData[];
}

export interface IDeskFormValues {
	name: string;
	country: (ICountry & { label: string }) | null;
	city: (ICity & { label: string }) | null;
	schedule?: {
		workingDays: number[];
		workingPeriod: {
			from: string;
			to: string;
		};
		workingHours: {
			from: string;
			to: string;
		};
		breaks: { from: Date | null; to: Date | null }[];
		detail: boolean;
		events?: { startStr: string; endStr: string }[];
	};
}
