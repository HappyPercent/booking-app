import {
  ICategory,
  ICity,
  ICountry,
  IDesk,
  IService,
  ISlot,
} from "../core/constants/types";
import {HttpClient, RequestParams} from "./http-client";

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
      method: "POST",
      body: data,
      auth: true,
      format: "text",
      ...params,
    });

  createDesk = (
    data: {name: string; cityId: number; countryId: number},
    params: RequestParams = {}
  ) =>
    this.request<string, any>({
      path: `/desk`,
      method: "POST",
      body: data,
      format: "text",
      ...params,
    });

  createService = (
    data: {
      name: string;
      categoryId: string;
      shortDescr: string;
      descr: string;
      pricePack: {duration: number; price: number; currency: string}[];
    },
    params: RequestParams = {}
  ) =>
    this.request<string, any>({
      path: `/proposal`,
      method: "POST",
      body: data,
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
      method: "POST",
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
      method: "POST",
      body: data,
      auth: true,
      format: "text",
      ...params,
    });

  getAllCountries = (params: RequestParams = {}) =>
    this.request<{content: ICountry[]}, any>({
      path: `/geo/country`,
      method: "GET",
      query: {
        page: 0,
        size: 500,
      },
      ...params,
    });

  getCityByCountry = (countryId: string, params: RequestParams = {}) =>
    this.request<{content: ICity[]}, any>({
      path: `/geo/city`,
      method: "GET",
      query: {
        countryId,
      },
      ...params,
    });

  getSlotsByDesk = (deskId: number, params: RequestParams = {}) =>
    this.request<{content: ISlot[]}, any>({
      path: `/slot`,
      method: "GET",
      query: {
        deskId: String(deskId),
        page: 0,
        size: 500,
      },
      ...params,
    });

  getUserDesks = (params: RequestParams = {}) =>
    this.request<{content: {desk: IDesk; proposal: IService}[]}, any>({
      path: `/desk/all`,
      method: "GET",
      query: {
        page: 0,
        size: 500,
      },
      ...params,
    });

  getUserServices = (params: RequestParams = {}) =>
    this.request<{content: IService[]}, any>({
      path: `/proposal`,
      method: "GET",
      query: {
        page: 0,
        size: 500,
      },
      ...params,
    });

  linkProposalToDesk = (
    proposalId: number,
    deskId: number,
    params: RequestParams = {}
  ) =>
    this.request<string, any>({
      path: `/proposal/link`,
      method: "POST",
      query: {
        proposalId: String(proposalId),
        deskId: String(deskId),
      },
      ...params,
    });

  getCategoryRootAll = (params: RequestParams = {}) =>
    this.request<{content: ICategory[]}, any>({
      path: `/category/root`,
      method: "GET",
      query: {
        size: 500,
      },
      ...params,
    });

  getCategoryChildByRootId = (
    rootCategoryId: string,
    params: RequestParams = {}
  ) =>
    this.request<{content: ICategory[]}, any>({
      path: `/category/child`,
      method: "GET",
      query: {
        rootCategoryId,
        size: 500,
      },
      ...params,
    });

  deleteProposalLink = (
    proposalId: number,
    deskId: number,
    params: RequestParams = {}
  ) =>
    this.request<void, any>({
      path: `/proposal/link`,
      method: "DELETE",
      query: {
        proposalId,
        deskId,
      },
      ...params,
    });

  getCurrencyAll = (params: RequestParams = {}) =>
    this.request<{code: string}[], any>({
      path: `/currency`,
      method: "GET",
      ...params,
    });
}

const api = new Api();

export default api;
