import { ICity, ICountry, IDesk } from '../../../core/constants/types';

export interface IDeskDialogProps {
	state: { open: boolean; edit?: boolean; desk?: IDesk };
	onClose: () => void;
}

export interface IDeskFormValues {
	name: string;
	country: (ICountry & { label: string }) | null;
	city: (ICity & { label: string }) | null;
	schedule?: {
		workingDays: number[];
		workingPeriod: {
			from: Date;
			to: Date;
		};
		workingHours: {
			from: Date;
			to: Date;
		};
		breaks: { from: Date | null; to: Date | null }[];
		detail: boolean;
		events?: { startStr: string; endStr: string }[];
	};
}
