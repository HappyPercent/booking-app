import { ICategory, ICity, ICountry, IDesk, IService, ISlot } from '../core/constants/types';
import { HttpClient, RequestParams } from './http-client';
import { BackendResponse } from './types';

class Api extends HttpClient {
	loginUser = (
		data: {
			password: string;
			username: string;
		},
		params: RequestParams = {}
	) =>
		this.request<string, any>({
			path: `/user/login`,
			method: 'POST',
			body: data,
			auth: false,
			format: 'text',
			...params,
		});

	createDesk = (data: { name: string; cityId: number; countryId: number }, params: RequestParams = {}) =>
		this.request<{ data: string }, any>({
			path: `/desk`,
			method: 'POST',
			body: data,
			...params,
		});

	editDesk = (
		data: {
			id: number;
			name: string;
			cityId: number;
			countryId: number;
		},
		params: RequestParams = {}
	) =>
		this.request<string, any>({
			path: `/desk`,
			method: 'PATCH',
			body: data,
			...params,
		});

	deleteDesk = (deskId: number, params: RequestParams = {}) =>
		this.request<void, any>({
			path: `/desk`,
			method: 'DELETE',
			query: {
				deskId,
			},
			...params,
		});

	createService = (
		data: {
			name: string;
			categoryId: string;
			shortDescr: string;
			descr: string;
			pricePack: { duration: number; price: number; currency: string }[];
		},
		params: RequestParams = {}
	) =>
		this.request<string, any>({
			path: `/proposal`,
			method: 'POST',
			body: data,
			...params,
		});

	editProposal = (
		data: {
			id: number;
			name: string;
			categoryId: string;
			shortDescr: string;
			descr: string;
			pricePack: { duration: number; price: number; currency: string }[];
		},
		params: RequestParams = {}
	) =>
		this.request<string, any>({
			path: `/proposal`,
			method: 'PATCH',
			body: data,
			...params,
		});

	deleteProposal = (proposalId: number, params: RequestParams = {}) =>
		this.request<void, any>({
			path: `/proposal`,
			method: 'DELETE',
			query: {
				proposalId,
			},
			...params,
		});

	createSlotsForDesk = (
		deskId: number,
		data: {
			dayOfWeek?: string;
			date?: string;
			dateTimeStart: string;
			dateTimeEnd: string;
			type?: string;
		}[],
		params: RequestParams = {}
	) =>
		this.request<string, any>({
			path: `/slot`,
			method: 'POST',
			query: {
				deskId: String(deskId),
			},
			body: data,
			...params,
		});

	createUser = (
		data: {
			password: string;
			username: string;
		},
		params: RequestParams = {}
	) =>
		this.request<string, any>({
			path: `/user/register`,
			method: 'POST',
			body: data,
			auth: false,
			format: 'text',
			...params,
		});

	getAllCountries = (params: RequestParams = {}) =>
		this.request<BackendResponse<ICountry[]>, any>({
			path: `/geo/country`,
			method: 'GET',
			query: {
				page: 0,
				size: 500,
			},
			...params,
		});

	getCityByCountry = (countryId: string, params: RequestParams = {}) =>
		this.request<BackendResponse<ICity[]>, any>({
			path: `/geo/city`,
			method: 'GET',
			query: {
				countryId,
			},
			...params,
		});

	getSlotsByDesk = (deskId: number, params: RequestParams = {}) =>
		this.request<BackendResponse<{ slot: ISlot; desk: IDesk }[]>, any>({
			path: `/slot`,
			method: 'GET',
			query: {
				deskId: String(deskId),
				page: 0,
				size: 500,
			},
			...params,
		});

	getUserDesks = (params: RequestParams = {}) =>
		this.request<BackendResponse<{ desk: IDesk; proposal: IService }[]>, any>({
			path: `/desk/all`,
			method: 'GET',
			query: {
				page: 0,
				size: 500,
			},
			...params,
		});

	getUserServices = (params: RequestParams = {}) =>
		this.request<BackendResponse<IService[]>, any>({
			path: `/proposal`,
			method: 'GET',
			query: {
				page: 0,
				size: 500,
			},
			...params,
		});

	linkProposalToDesk = (proposalId: number, deskId: number, params: RequestParams = {}) =>
		this.request<string, any>({
			path: `/proposal/link`,
			method: 'POST',
			query: {
				proposalId: String(proposalId),
				deskId: String(deskId),
			},
			...params,
		});

	getCategoryRootAll = (params: RequestParams = {}) =>
		this.request<BackendResponse<ICategory[]>, any>({
			path: `/category/root`,
			method: 'GET',
			query: {
				size: 500,
			},
			...params,
		});

	getCategoryChildByRootId = (rootCategoryId: string, params: RequestParams = {}) =>
		this.request<BackendResponse<ICategory[]>, any>({
			path: `/category/child`,
			method: 'GET',
			query: {
				rootCategoryId,
				size: 500,
			},
			...params,
		});

	deleteProposalLink = (proposalId: number, deskId: number, params: RequestParams = {}) =>
		this.request<void, any>({
			path: `/proposal/link`,
			method: 'DELETE',
			query: {
				proposalId,
				deskId,
			},
			...params,
		});

	getCurrencyAll = (params: RequestParams = {}) =>
		this.request<{ data: { code: string }[] }, any>({
			path: `/currency`,
			method: 'GET',
			...params,
		});

	updateSlotByDesk = (deskId: string, slots: { dateTimeStart: string; dateTimeEnd: string }[], params: RequestParams = {}) =>
		this.request<string, any>({
			path: `/slot/update`,
			method: 'POST',
			query: {
				deskId,
			},
			body: slots,
			...params,
		});

	getDeskByOwner = (ownerId: string, params: RequestParams = {}) =>
		this.request<BackendResponse<{ desk: IDesk; proposal: IService }[]>, any>({
			path: `/search/owner/${ownerId}`,
			method: 'GET',
			query: {
				page: 0,
				size: 500,
			},
			auth: false,
			...params,
		});

	getDeskById = (deskId: string, params: RequestParams = {}) =>
		this.request<BackendResponse<{ desk: IDesk; proposal: IService }[]>, any>({
			path: `/search/desk/${deskId}`,
			method: 'GET',
			auth: false,
			...params,
		});

	getFreeSlotsByServicePricePack = (data: { ownerId: number; deskId: number; proposalId: number; pricePackId: number }, params: RequestParams = {}) =>
		this.request<BackendResponse<ISlot[]>, any>({
			path: `/search/slots`,
			method: 'GET',
			query: {
				size: 500,
				...data,
			},
			auth: false,
			...params,
		});

	bookSlot = (data: { ownerId: number; deskId: number; proposalId: number; pricePackId: number; slotsIds: string[] }, params: RequestParams = {}) =>
		this.request<BackendResponse<string>, any>({
			path: `/booking/book`,
			method: 'POST',
			body: data.slotsIds,
			query: {
				ownerId: data.ownerId,
				deskId: data.deskId,
				proposalId: data.proposalId,
				pricePackId: data.pricePackId,
			},
			...params,
		});
}

const api = new Api();

export default api;
