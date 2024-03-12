import eachWeekOfInterval from 'date-fns/eachWeekOfInterval';
import startOfWeek from 'date-fns/startOfWeek';

export const getSpreadWeekSchedule = (
	start: Date,
	end: Date,
	weekSchedule: {
		startStr: string;
		endStr: string;
	}[]
) => {
	const allWeeks = eachWeekOfInterval({
		start,
		end,
	});
	const weekSchedulePure = weekSchedule.map((event) => ({
		start: Number(new Date(event.startStr)) - Number(startOfWeek(new Date(event.startStr))),
		end: Number(new Date(event.endStr)) - Number(startOfWeek(new Date(event.endStr))),
	}));

	const output = [] as {
		start: string;
		end: string;
		startStr: string;
		endStr: string;
	}[];
	allWeeks.forEach((weekStart) => {
		weekSchedulePure.forEach((event) => {
			output.push({
				start: new Date(Number(weekStart) + event.start).toISOString(),
				end: new Date(Number(weekStart) + event.end).toISOString(),
				startStr: new Date(Number(weekStart) + event.start).toISOString(),
				endStr: new Date(Number(weekStart) + event.end).toISOString(),
			});
		});
	});

	return output;
};
