import startOfDay from "date-fns/startOfDay";
import {INewDeskFormValues} from "../../DesksGrid/NewDeskDialog/types";
import addDays from "date-fns/addDays";
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
import getMinutes from "date-fns/getMinutes";
import getHours from "date-fns/getHours";
import getDay from "date-fns/getDay";

export const getEvents = (data: INewDeskFormValues["schedule"]) => {
  const output = [] as {
    start: string;
    end: string;
    startStr: string;
    endStr: string;
  }[];
  const setStartOfWorkingDay = createStartOfWorkingDayFunction(
    data.workingHours
  );
  const setEndOfWorkingDay = createSetEndOfWorkingDayFunction(
    data.workingHours
  );
  let dateTime = setMinutes(
    setHours(
      startOfDay(data.workingPeriod.from),
      getHours(data.workingHours.from)
    ),
    getMinutes(data.workingHours.from)
  );
  const dateTimeEnd = setMinutes(
    setHours(startOfDay(data.workingPeriod.to), getHours(data.workingHours.to)),
    getMinutes(data.workingHours.to)
  );
  while (true) {
    if (dateTime > dateTimeEnd) {
      break;
    }
    if (!data.workingDays.includes(getDay(dateTime))) {
      dateTime = addDays(setStartOfWorkingDay(dateTime), 1);
      continue;
    }
    output.push({
      start: dateTime.toISOString(),
      end: setEndOfWorkingDay(dateTime).toISOString(),
      startStr: dateTime.toISOString(),
      endStr: setEndOfWorkingDay(dateTime).toISOString(),
    });
    dateTime = addDays(setStartOfWorkingDay(dateTime), 1);
  }

  return output;
};

const createStartOfWorkingDayFunction =
  (workingHours: {from: Date; to: Date}) => (date: Date) =>
    setMinutes(
      setHours(startOfDay(date), getHours(workingHours.from)),
      getMinutes(workingHours.from)
    );

const createSetEndOfWorkingDayFunction =
  (workingHours: {from: Date; to: Date}) => (date: Date) =>
    setMinutes(
      setHours(startOfDay(date), getHours(workingHours.to)),
      getMinutes(workingHours.to)
    );
