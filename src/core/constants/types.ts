export interface IService {
	id?: number;
	name: string;
	category?: ICategory;
	shortDescr?: string;
	descr?: string;
	pricePack?: IPricePack[];
}

export interface IPricePack {
	id: number;
	duration: number;
	price: number;
	currency: string;
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

export interface IUser {
	dateCreated: string;
	id: number;
	name: string;
	username: string;
}

export interface IBooking {
	dateCreated: string;
	id: number;
	pricePack: IPricePack;
	status: string;
	user: IUser;
	proposal: IService;
}
