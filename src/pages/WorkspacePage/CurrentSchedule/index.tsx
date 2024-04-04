import FullCalendar from '@fullcalendar/react';
import { useGetSlotsByDesk } from '../../../core/hooks/useGetSlotsByDesk';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useMemo, useRef, useState } from 'react';
import { useCoreStore } from '../../../core/store';
import { useTranslation } from 'react-i18next';
import { DateSelectArg, EventContentArg } from '@fullcalendar/core';
import endOfDay from 'date-fns/endOfDay';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../../../client/api';
import { ISlot } from '../../../core/constants/types';
import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material';

export const CurrentSchedule = ({ deskId }: { deskId: number }) => {
	const calendarRef = useRef<FullCalendar | null>(null);
	const [isEdit, setIsEdit] = useState(false);
	const lang = useCoreStore((state) => state.userSettings.lang);
	const { t } = useTranslation();
	const { data } = useGetSlotsByDesk(deskId);
	const [bookingData, setBookingData] = useState<ISlot | null>(null);
	const queryClient = useQueryClient();

	const { mutate: updateSlots } = useMutation(() =>
		api.updateSlotByDesk(
			String(deskId),
			calendarRef.current
				?.getApi()
				?.getEvents()
				.map((event) => ({ dateTimeEnd: event.endStr, dateTimeStart: event.startStr })) || []
		)
	);

	const { mutate: declineBooking } = useMutation(() => api.declineBooking([bookingData?.id || 0]), {
		onSuccess: () => {
			setBookingData(null);
			queryClient.invalidateQueries(['slotsWithDesks', deskId]);
		},
	});
	const { mutate: confirmBooking } = useMutation(() => api.confirmBooking([bookingData?.id || 0]), {
		onSuccess: () => {
			setBookingData(null);
			queryClient.invalidateQueries(['slotsWithDesks', deskId]);
		},
	});

	const calendarData = useMemo(
		() =>
			data?.map(({ slot, booking }) => ({
				start: slot.dateTimeStart,
				end: slot.dateTimeEnd,
				startStr: slot.dateTimeStart,
				endStr: slot.dateTimeEnd,
				title: booking?.status || '',
				slot,
				booking,
			})),
		[data]
	);

	const handleCancelEdit = () => {
		setIsEdit(false);
		const calendarApi = calendarRef.current?.getApi();
		calendarApi?.removeAllEvents();
		calendarApi?.removeAllEventSources();
		calendarApi?.addEventSource(calendarData || []);
	};

	const handleSaveSchedule = () => {
		updateSlots();
		setIsEdit(false);
	};

	const handleSelect = (selectInfo: DateSelectArg) => {
		let calendarApi = selectInfo.view.calendar;
		calendarApi.unselect();
		calendarApi.addEvent({
			start: selectInfo.startStr,
			end: new Date(Math.min(Number(new Date(selectInfo.endStr)), Number(endOfDay(new Date(selectInfo.startStr))))).toISOString(),
			title: 'Working time',
		});
	};

	const handleEventClick = (data: ISlot) => {
		setBookingData(data);
	};

	return (
		<>
			<FullCalendar
				key={deskId}
				ref={calendarRef}
				customButtons={{
					edit: {
						text: t('Edit'),
						click: () => setIsEdit(true),
					},
					save: {
						text: t('Save'),
						click: handleSaveSchedule,
					},
					cancel: {
						text: t('Cancel'),
						click: handleCancelEdit,
					},
				}}
				headerToolbar={{
					end: isEdit ? 'save cancel today prev,next' : 'edit today prev,next',
				}}
				buttonText={{
					today: t('Today'),
				}}
				locale={lang}
				forceEventDuration={true}
				eventClick={(event) => isEdit && event.event.remove()}
				select={handleSelect}
				events={calendarData}
				slotDuration={'00:15:00'}
				plugins={[timeGridPlugin, interactionPlugin]}
				allDaySlot={false}
				editable={isEdit}
				selectable={isEdit}
				selectOverlap={false}
				eventOverlap={false}
				eventContent={(event) => <EventContent event={event} onClick={handleEventClick} />}
			/>
			<Dialog open={!!bookingData} onClose={() => setBookingData(null)}>
				<DialogTitle>{t('Do you want to confirm this booking')}?</DialogTitle>
				<DialogActions>
					<Button onClick={() => declineBooking()} color='primary'>
						{t('Decline')}
					</Button>
					<Button onClick={() => confirmBooking()} color='primary'>
						{t('Confirm')}
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};

const EventContent = ({ event, onClick }: { event: EventContentArg; onClick: (data: ISlot) => void }) => {
	const unconfrimed = event.event.extendedProps.booking?.status === 'UNCONFIRMED';

	return (
		<div
			style={{
				backgroundColor: unconfrimed ? 'red' : 'primary.main',
				cursor: unconfrimed ? 'pointer' : 'unset',
				borderRadius: 1,
				padding: 1,
			}}
			onClick={() => unconfrimed && onClick(event.event.extendedProps.slot)}
		>
			{event?.event?.title}
		</div>
	);
};
