import startOfDay from "date-fns/startOfDay";
import {INewDeskFormValues} from "../types";
import addDays from "date-fns/addDays";
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
import getMinutes from "date-fns/getMinutes";
import getHours from "date-fns/getHours";
import addMinutes from "date-fns/addMinutes";
import getDay from "date-fns/getDay";

export const transformDeskDataForRequest = (data: INewDeskFormValues) => {
  if (data.city?.id && data.country?.id) {
    const output = {
      name: data.name,
      cityId: data.city.id,
      countryId: data.country.id,
      schedule: [],
    } as {
      name: string;
      cityId: number;
      countryId: number;
      schedule: {dateTimeStart: string; dateTimeEnd: string}[];
    };
    const resetDate = createResetFunction(data.schedule.workingHours);
    let dateTime = setMinutes(
      setHours(
        startOfDay(data.schedule.workingPeriod.from),
        getHours(data.schedule.workingHours.from)
      ),
      getMinutes(data.schedule.workingHours.from)
    );
    const dateTimeEnd = setMinutes(
      setHours(
        startOfDay(data.schedule.workingPeriod.to),
        getHours(data.schedule.workingHours.to)
      ),
      getMinutes(data.schedule.workingHours.from)
    );
    while (true) {
      if (dateTime > dateTimeEnd) {
        break;
      }
      if (
        !data.schedule.workingDays.includes(getDay(dateTime)) ||
        (getHours(dateTime) >= getHours(dateTimeEnd) &&
          getMinutes(dateTime) >= getMinutes(dateTimeEnd))
      ) {
        dateTime = addDays(resetDate(dateTime), 1);
        continue;
      }
      output.schedule.push({
        dateTimeStart: dateTime.toISOString(),
        dateTimeEnd: addMinutes(dateTime, 15).toISOString(),
      });
      dateTime = addMinutes(dateTime, 15);
    }

    return output;
  }
};

const createResetFunction =
  (workingHours: {from: Date; to: Date}) => (date: Date) => {
    return setMinutes(
      setHours(startOfDay(date), getHours(workingHours.from)),
      getMinutes(workingHours.from)
    );
  };
