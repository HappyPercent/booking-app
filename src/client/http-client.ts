import { LOCAL_STORAGE_USER_CREDENTIALS_LABEL } from '../core/constants/localStorage';
import { BASE_ROUTE } from '../core/constants/requestRoutes';
import { useCoreStore } from '../core/store';
import { routesList } from '../routes/routesList';

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, 'body' | 'bodyUsed'>;

export interface FullRequestParams extends Omit<RequestInit, 'body'> {
	/** set parameter to `true` for call `securityWorker` for this request */
	secure?: boolean;
	/** request path */
	path: string;
	/** content type of request body */
	type?: ContentType;
	/** query params */
	query?: QueryParamsType;
	/** format of response (i.e. response.json() -> format: "json") */
	format?: ResponseFormat;
	/** request body */
	body?: unknown;
	/** base url */
	baseUrl?: string;
	/** should handle auth errors and check credentials */
	auth?: boolean;
}

export type RequestParams = Omit<FullRequestParams, 'body' | 'method' | 'query' | 'path' | 'customErrorHandler'>;

export interface ApiConfig<SecurityDataType = unknown> {
	baseUrl?: string;
	baseApiParams?: Omit<RequestParams, 'baseUrl' | 'cancelToken' | 'signal'>;
	securityWorker?: (securityData: SecurityDataType | null) => Promise<RequestParams | void> | RequestParams | void;
	customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown> extends Response {
	data: D;
	error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
	Json = 'application/json',
	FormData = 'multipart/form-data',
	UrlEncoded = 'application/x-www-form-urlencoded',
}

export class HttpClient<SecurityDataType = unknown> {
	public baseUrl: string = '';
	private securityData: SecurityDataType | null = null;
	private securityWorker?: ApiConfig<SecurityDataType>['securityWorker'];
	private abortControllers = new Map<CancelToken, AbortController>();
	private customFetch = (...fetchParams: Parameters<typeof fetch>) => fetch(...fetchParams);

	private baseApiParams: RequestParams = {
		// credentials: "include",
		headers: {},
		redirect: 'follow',
		referrerPolicy: 'no-referrer',
	};

	constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
		Object.assign(this, apiConfig);
	}

	private encodeQueryParam(key: string, value: any) {
		const encodedKey = encodeURIComponent(key);
		return `${encodedKey}=${encodeURIComponent(typeof value === 'number' ? value : `${value}`)}`;
	}

	private addQueryParam(query: QueryParamsType, key: string) {
		return this.encodeQueryParam(key, query[key]);
	}

	private addArrayQueryParam(query: QueryParamsType, key: string) {
		const value = query[key];
		return value.map((v: any) => this.encodeQueryParam(key, v)).join('&');
	}

	protected toQueryString(rawQuery?: QueryParamsType): string {
		const query = rawQuery || {};
		const keys = Object.keys(query).filter((key) => 'undefined' !== typeof query[key]);
		return keys.map((key) => (Array.isArray(query[key]) ? this.addArrayQueryParam(query, key) : this.addQueryParam(query, key))).join('&');
	}

	private contentFormatters: Record<ContentType, (input: any) => any> = {
		[ContentType.Json]: (input: any) => (input !== null && (typeof input === 'object' || typeof input === 'string') ? JSON.stringify(input) : input),
		[ContentType.FormData]: (input: any) => {
			const formData = new FormData();

			Object.entries(input || {}).forEach(([key, value]) => {
				if (Array.isArray(value)) {
					for (const obj of value) {
						if (typeof obj === 'string' || obj instanceof Blob) {
							formData.append(key, obj);
						} else if (typeof value === 'object' && value !== null) {
							formData.append(key, JSON.stringify(value));
						}
					}
				} else if (typeof value === 'string' || value instanceof Blob) {
					formData.append(key, value);
				} else if (typeof value === 'object' && value !== null) {
					formData.append(key, JSON.stringify(value));
				} else if (typeof value === 'number') {
					formData.append(key, `${value}`);
				}
			});

			return formData;
		},
		[ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
	};

	private mergeRequestParams(params1: RequestParams, params2?: RequestParams): RequestParams {
		return {
			...this.baseApiParams,
			...params1,
			...(params2 || {}),
			headers: {
				...(this.baseApiParams.headers || {}),
				...(params1.headers || {}),
				...((params2 && params2.headers) || {}),
			},
		};
	}

	private enqueueServerError = (response: any) => {
		const { status } = response;

		if (status === 401) {
			localStorage.removeItem(LOCAL_STORAGE_USER_CREDENTIALS_LABEL);
			window.location.href = routesList.LOGIN;
		}
	};

	public request = async <T = any, E = any>({
		body,
		secure,
		path,
		type = ContentType.Json,
		query,
		format = 'json',
		baseUrl = BASE_ROUTE,
		auth = false,
		...params
	}: FullRequestParams): Promise<HttpResponse<T, E>> => {
		const requestParams = this.mergeRequestParams(params);
		const queryString = query && this.toQueryString(query);
		const payloadFormatter = this.contentFormatters[type || ContentType.Json];
		const responseFormat = format || requestParams.format;
		const user = JSON.parse(localStorage.getItem(LOCAL_STORAGE_USER_CREDENTIALS_LABEL) || '{}');
		const lang = useCoreStore.getState().userSettings.lang || 'en-GB';
		const headers: HeadersInit = {
			'Accept-Language': lang,
		};
		if (!auth) {
			headers.Authorization = `Basic ${btoa(`${user.username}:${user.password}` || '')}`;
		}

		return this.customFetch(`${baseUrl || this.baseUrl || ''}${path}${queryString ? `?${queryString}` : ''}`, {
			...requestParams,
			headers: {
				...headers,
				...(type && type !== ContentType.FormData ? { 'Content-Type': type } : {}),
				...(requestParams.headers || {}),
			},
			body: typeof body === 'undefined' || body === null ? null : payloadFormatter(body),
		}).then(async (response) => {
			let r: HttpResponse<T, E>;
			r = response.clone() as HttpResponse<T, E>;
			r.data = null as unknown as T;
			r.error = null as unknown as E;

			response.json = response.text;

			const clonedResponse = r.clone();
			const data = !responseFormat
				? (clonedResponse as HttpResponse<T, E>)
				: await response[responseFormat]()
						.then((data) => {
							if (r.ok) {
								r.data = responseFormat === 'json' ? JSON.parse(data) : data;
							} else {
								r.error = responseFormat === 'json' ? JSON.parse(data) : data;
							}
							return r;
						})
						.catch((e) => {
							r.error = e;
							return r;
						});

			if (!response.ok) {
				!auth && this.enqueueServerError(data);
			}
			return data;
		});
	};
}
