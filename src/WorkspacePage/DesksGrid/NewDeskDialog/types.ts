import {ICity, ICountry} from "../../../core/constants/types";

export interface INewDeskFormValues {
  name: string;
  country: (ICountry & {label: string}) | null;
  city: (ICity & {label: string}) | null;
  schedule: {
    workingDays: string[];
    workingPeriod: {
      from: Date;
      to: Date;
    };
    workingHours: {
      from: Date;
      to: Date;
    };
    detail: boolean;
  };
}
