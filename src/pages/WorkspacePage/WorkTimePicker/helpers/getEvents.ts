// import { IDeskFormValues } from '../../DesksGrid/DeskDialog/types';
// import getDay from 'date-fns/getDay';
// import { eachDayOfInterval, getDayOfYear, getYear, setDayOfYear, setYear } from 'date-fns';

// export const getEvents = (data: IDeskFormValues['schedule']) => {
// 	const output = [] as {
// 		start: string;
// 		end: string;
// 		startStr: string;
// 		endStr: string;
// 	}[];
// 	if (!data) return output;
// 	const oneDayEvents = getOneDayEvents(data);
// 	const period = eachDayOfInterval({
// 		start: data.workingPeriod.from,
// 		end: data.workingPeriod.to,
// 	});
// 	for (const day of period) {
// 		if (!data.workingDays.includes(getDay(day))) {
// 			continue;
// 		}
// 		for (const event of oneDayEvents) {
// 			const start = setDayOfYear(setYear(event.start, getYear(day)), getDayOfYear(day));
// 			const end = setDayOfYear(setYear(event.end, getYear(day)), getDayOfYear(day));
// 			output.push({
// 				start: start.toISOString(),
// 				end: end.toISOString(),
// 				startStr: start.toISOString(),
// 				endStr: end.toISOString(),
// 			});
// 		}
// 	}

// 	return output;
// };

// const getOneDayEvents = (data: NonNullable<IDeskFormValues['schedule']>) => {
// 	const breaks = getPureSortedBreaks(data.breaks);
// 	let timeStart = setDayOfYear(setYear(data.workingHours.from, 1900), 1);
// 	const timeEnd = setDayOfYear(setYear(data.workingHours.to, 1900), 1);
// 	const res = [];
// 	if (!breaks.length) {
// 		res.push({ start: timeStart, end: timeEnd });
// 	} else {
// 		for (let i = 0; i < breaks.length; i++) {
// 			if (timeStart < breaks[i].from && timeEnd > breaks[i].from) {
// 				res.push({
// 					start: timeStart,
// 					end: breaks[i].from,
// 				});
// 				timeStart = breaks[i].to;
// 			}
// 		}
// 		if (timeStart < timeEnd) {
// 			res.push({
// 				start: timeStart,
// 				end: timeEnd,
// 			});
// 		}
// 	}
// 	return res;
// };

// const getPureSortedBreaks = (data: NonNullable<IDeskFormValues['schedule']>['breaks']) => {
// 	const breaks = [
// 		...(
// 			data.filter((b) => b.from && b.to && b.from < b.to) as {
// 				from: Date;
// 				to: Date;
// 			}[]
// 		).map((b) => ({
// 			from: setDayOfYear(setYear(b.from, 1900), 1),
// 			to: setDayOfYear(setYear(b.to, 1900), 1),
// 		})),
// 	];
// 	const res = [];
// 	while (breaks.length) {
// 		const current = breaks.shift()!;
// 		for (let i = 0; i < breaks.length; i++) {
// 			// current includes breaks[i]
// 			if (current.from <= breaks[i].from && current.to >= breaks[i].to) {
// 				breaks.splice(i, 1);
// 				i--;
// 				continue;
// 			}
// 			// current is included in breaks[i]
// 			if (current.from >= breaks[i].from && current.to <= breaks[i].to) {
// 				current.from = breaks[i].from;
// 				current.to = breaks[i].to;
// 				breaks.splice(i, 1);
// 				i--;
// 				continue;
// 			}
// 			// current prologs breaks[i]
// 			if (current.from >= breaks[i].from && current.to >= breaks[i].to && current.from <= breaks[i].to) {
// 				current.from = breaks[i].from;
// 				breaks.splice(i, 1);
// 				i--;
// 				continue;
// 			}
// 			// current is prologed by breaks[i]
// 			if (current.from <= breaks[i].from && current.to <= breaks[i].to && current.to >= breaks[i].from) {
// 				current.to = breaks[i].to;
// 				breaks.splice(i, 1);
// 				i--;
// 				continue;
// 			}
// 		}
// 		res.push(current);
// 	}
// 	return res.sort((a, b) => a.from.getTime() - b.from.getTime());
// };

export const a = 1;
