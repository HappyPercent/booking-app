export interface IService {
  id: number;
  name: string;
  category: ICategory;
  shortDescr: string;
  descr: string;
  duration: number;
  price: number;
}

export interface IDesk {
  id: number;
  name: string;
  dateCreated: string;
  owner: {
    id: number;
    name: string;
    username: string;
    dateCreated: string;
  };
  country: string;
  city: string;
  timezone: string;
  private: boolean;
  active: boolean;
}

export interface ICountry {
  id: number;
  name: string;
}

export interface ICity {
  id: number;
  name: string;
  country: ICountry;
}

export interface ISlot {
  id: number;
  type: string;
  dateTimeStart: string;
  dateTimeEnd: string;
  durationMinutes: number;
  desk: IDesk;
}

export interface ICategory {
  id: number;
  name: string;
  description?: string;
  root?: ICategory;
}
