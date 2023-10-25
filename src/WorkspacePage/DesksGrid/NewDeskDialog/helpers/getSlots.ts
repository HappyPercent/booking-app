import startOfDay from "date-fns/startOfDay";
import {INewDeskFormValues} from "../types";
import addDays from "date-fns/addDays";
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
import getMinutes from "date-fns/getMinutes";
import getHours from "date-fns/getHours";
import addMinutes from "date-fns/addMinutes";
import getDay from "date-fns/getDay";
import differenceInMinutes from "date-fns/differenceInMinutes";

export const getSlots = (data: INewDeskFormValues["schedule"]) => {
  const output = [] as {dateTimeStart: string; dateTimeEnd: string}[];
  if (data.events?.length) {
    data.events.forEach((event) => {
      const diff = differenceInMinutes(
        new Date(event.endStr),
        new Date(event.startStr)
      );
      if (diff > 15) {
        for (let index = 0; index < diff / 15; index++) {
          output.push({
            dateTimeStart: addMinutes(
              new Date(event.startStr),
              index * 15
            ).toISOString(),
            dateTimeEnd: addMinutes(
              new Date(event.startStr),
              (index + 1) * 15
            ).toISOString(),
          });
        }
      } else {
        output.push({
          dateTimeStart: new Date(event.startStr).toISOString(),
          dateTimeEnd: new Date(event.endStr).toISOString(),
        });
      }
    });
    return output;
  }

  const resetDate = createResetFunction(data.workingHours);
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
    if (
      !data.workingDays.includes(getDay(dateTime)) ||
      (getHours(dateTime) >= getHours(dateTimeEnd) &&
        getMinutes(dateTime) >= getMinutes(dateTimeEnd))
    ) {
      dateTime = addDays(resetDate(dateTime), 1);
      continue;
    }
    output.push({
      dateTimeStart: dateTime.toISOString(),
      dateTimeEnd: addMinutes(dateTime, 15).toISOString(),
    });
    dateTime = addMinutes(dateTime, 15);
  }

  return output;
};

const createResetFunction =
  (workingHours: {from: Date; to: Date}) => (date: Date) => {
    return setMinutes(
      setHours(startOfDay(date), getHours(workingHours.from)),
      getMinutes(workingHours.from)
    );
  };
