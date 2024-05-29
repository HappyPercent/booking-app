import uk from 'date-fns/locale/uk';
import set from 'date-fns/set';

export const getWorkingTimeOptions = (start?: string) => {
	let startOfDay = start ? set(new Date(start), { year: 1900, month: 0, date: 1 }) : new Date('1900-01-01T00:00:00');
	const endOfDay = new Date('1900-01-01T23:45:00');
	const options = [];
	while (startOfDay <= endOfDay) {
		options.push({
			label: startOfDay.toLocaleTimeString(uk.code, { hour: '2-digit', minute: '2-digit' }),
			value: startOfDay,
		});
		startOfDay = new Date(startOfDay.getTime() + 15 * 60 * 1000);
	}
	return options;
};
