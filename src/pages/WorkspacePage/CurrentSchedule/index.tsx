import FullCalendar from '@fullcalendar/react';
import { useGetSlotsByDesk } from '../../../core/hooks/useGetSlotsByDesk';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useMemo, useRef, useState } from 'react';
import { useCoreStore } from '../../../core/store';
import { useTranslation } from 'react-i18next';
import { DateSelectArg } from '@fullcalendar/core';
import endOfDay from 'date-fns/endOfDay';
import { useMutation } from '@tanstack/react-query';
import api from '../../../client/api';

export const CurrentSchedule = ({ deskId }: { deskId: number }) => {
	const calendarRef = useRef<FullCalendar | null>(null);
	const [isEdit, setIsEdit] = useState(false);
	const lang = useCoreStore((state) => state.userSettings.lang);
	const { t } = useTranslation();
	const { data } = useGetSlotsByDesk(deskId);

	const { mutate: updateSlots } = useMutation(() =>
		api.updateSlotByDesk(
			String(deskId),
			calendarRef.current
				?.getApi()
				?.getEvents()
				.map((event) => ({ dateTimeEnd: event.endStr, dateTimeStart: event.startStr })) || []
		)
	);

	const calendarData = useMemo(
		() =>
			data?.map(({ slot: { dateTimeEnd, dateTimeStart } }) => ({
				start: dateTimeStart,
				end: dateTimeEnd,
				startStr: dateTimeStart,
				endStr: dateTimeEnd,
				title: 'Working time',
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

	return (
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
			initialEvents={calendarData}
			slotDuration={'00:15:00'}
			plugins={[timeGridPlugin, interactionPlugin]}
			allDaySlot={false}
			editable={isEdit}
			selectable={isEdit}
			selectOverlap={false}
			eventOverlap={false}
			eventContent={() => (
				<div
					style={{
						backgroundColor: 'primary.main',
						borderRadius: 1,
						padding: 1,
					}}
				>
					Free
				</div>
			)}
		/>
	);
};
