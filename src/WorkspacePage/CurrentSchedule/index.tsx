import FullCalendar from "@fullcalendar/react";
import {useGetSlotsByDesk} from "../../core/hooks/useGetSlotsByDesk";
import timeGridPlugin from "@fullcalendar/timegrid";
import {useMemo} from "react";
import {useCoreStore} from "../../core/store";
import {useTranslation} from "react-i18next";
export const CurrentSchedule = ({deskId}: {deskId: number}) => {
  const lang = useCoreStore((state) => state.userSettings.lang);
  const {t} = useTranslation();
  const {data} = useGetSlotsByDesk(deskId);

  const calendarData = useMemo(
    () =>
      data?.content.map(({dateTimeEnd, dateTimeStart}) => ({
        start: dateTimeStart,
        end: dateTimeEnd,
        startStr: dateTimeStart,
        endStr: dateTimeEnd,
        title: "Working time",
      })),
    [data?.content]
  );

  return (
    <FullCalendar
      buttonText={{
        today: t("Today"),
      }}
      locale={lang}
      forceEventDuration={true}
      events={calendarData}
      slotDuration={"00:15:00"}
      plugins={[timeGridPlugin]}
      allDaySlot={false}
      editable={false}
      selectable={false}
      selectOverlap={false}
      eventOverlap={false}
      eventContent={() => (
        <div
          style={{
            backgroundColor: "primary.main",
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