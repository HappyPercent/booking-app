import { Button, Chip, Stack, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import { ISlot } from '../../../core/constants/types';
import { useEffect, useMemo, useState } from 'react';
import format from 'date-fns/format';

export const SlotsPicker = ({ serviceTimes, freeSlots }: { serviceTimes: number; freeSlots?: ISlot[] }) => {
	const { t } = useTranslation();
	const [selectedDate, setSelectedDate] = useState<string | undefined>();
	const [query, setQuery] = useSearchParams();

	const slotDisplayData = useMemo(
		() =>
			freeSlots?.reduce((curr: { [key: string]: ISlot[] }, next) => {
				for (let i = 1; i < serviceTimes; i++) {
					const nextFreeTime = freeSlots.find(
						(slot) => Number(new Date(slot.dateTimeStart)) === Number(new Date(next.dateTimeStart)) + 15 * 60 * 1000 * i
					);
					if (!nextFreeTime) return curr;
				}
				const day = next.dateTimeStart.split('T')[0];
				if (curr[day]) {
					curr[day].push(next);
				} else {
					curr[day] = [next];
				}
				return curr;
			}, {}),
		[freeSlots, serviceTimes]
	);

	const handlePrevDateClick = () => {
		if (slotDisplayData) {
			const dates = Object.keys(slotDisplayData);
			const currentIndex = dates.indexOf(selectedDate as string);
			if (currentIndex > 0) {
				setSelectedDate(dates[currentIndex - 1]);
			}
		}
	};

	const handleNextDateClick = () => {
		if (slotDisplayData) {
			const dates = Object.keys(slotDisplayData);
			const currentIndex = dates.indexOf(selectedDate as string);
			if (currentIndex < dates.length - 1) {
				setSelectedDate(dates[currentIndex + 1]);
			}
		}
	};

	const handleSlotClick = (slot: ISlot) => {
		const slotsIds = [slot.id];
		if (serviceTimes > 1) {
			for (let i = 1; i < serviceTimes; i++) {
				const nextFreeTime = freeSlots?.find(
					(freeSlot) => Number(new Date(freeSlot.dateTimeStart)) === Number(new Date(slot.dateTimeStart)) + 15 * 60 * 1000 * i
				);
				if (nextFreeTime) {
					slotsIds.push(nextFreeTime.id);
				}
			}
		}
		query.set('booking', JSON.stringify({ slotsIds }));
		setQuery(query);
	};

	useEffect(() => {
		if (slotDisplayData) {
			setSelectedDate(Object.keys(slotDisplayData)[0]);
		}
	}, [slotDisplayData]);

	if (!freeSlots) return null;

	return (
		<Stack spacing={2}>
			<Typography variant='h6'>{t('Free slots')}</Typography>
			{freeSlots.length === 0 && <Typography>{t('No free slots')}</Typography>}
			{!!selectedDate && (
				<Stack spacing={1} direction='row' alignItems='center'>
					<Button onClick={handlePrevDateClick}>Prev</Button>
					<div>{selectedDate}</div>
					<Button onClick={handleNextDateClick}>Next</Button>
				</Stack>
			)}
			{!!selectedDate && (
				<Stack spacing={1} direction='row' flexWrap='wrap' gap={1}>
					{slotDisplayData?.[selectedDate].map((slot) => (
						<Chip onClick={() => handleSlotClick(slot)} clickable key={slot.id} label={format(new Date(slot.dateTimeStart), 'Pp')} />
					))}
				</Stack>
			)}
		</Stack>
	);
};
