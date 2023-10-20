export interface IService {
  id?: number;
  name: string;
  category: string;
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
