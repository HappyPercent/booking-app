import addWeeks from 'date-fns/addWeeks';
import startOfToday from 'date-fns/startOfToday';
import { IDeskFormValues } from './types';

export const DEFAULT_WORKING_DAYS = [1, 2, 3, 4, 5];
export const WEEKDAYS = {
	0: { label: 'SUN' },
	1: { label: 'MON' },
	2: { label: 'TUE' },
	3: { label: 'WED' },
	4: { label: 'THU' },
	5: { label: 'FRI' },
	6: { label: 'SAT' },
} as { [key in number]: { label: string } };

export const DEFAULT_FORM_VALUES = {
	name: '',
	country: null,
	city: null,
	schedule: {
		workingDays: Object.values(DEFAULT_WORKING_DAYS).map((day) => Number(day)),
		workingPeriod: {
			from: startOfToday().toISOString(),
			to: addWeeks(startOfToday(), 52).toISOString(),
		},
		workingHours: {
			from: new Date('1900-01-01T09:00:00').toString(),
			to: new Date('1900-01-01T18:00:00').toString(),
		},
		breaks: [],
		detail: false,
	},
} as IDeskFormValues;
