/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface AuthorFilterExp {
  $and?: AuthorFilterExp[];
  $or?: AuthorFilterExp[];
  $not?: AuthorFilterExp;
  author_id?:
    | {
        $eq: number;
      }
    | {
        $neq: number;
      }
    | {
        $gt: number;
      }
    | {
        $lt: number;
      }
    | {
        $gte: number;
      }
    | {
        $lte: number;
      };
  name?:
    | {
        $eq: string;
      }
    | {
        $neq: string;
      }
    | {
        $gt: string;
      }
    | {
        $lt: string;
      }
    | {
        $gte: string;
      }
    | {
        $lte: string;
      };
}

export interface AuthorSortExp {
  author_id?: "Asc" | "Desc";
  name?: "Asc" | "Desc";
}

export interface Page {
  "[limit]"?: number;
  "[offset]"?: number;
}

export interface Author {
  author_id: number;
  name: string;
}

export interface ArticleFilterExp {
  $and?: ArticleFilterExp[];
  $or?: ArticleFilterExp[];
  $not?: ArticleFilterExp;
  article_id?:
    | {
        $eq: number;
      }
    | {
        $neq: number;
      }
    | {
        $gt: number;
      }
    | {
        $lt: number;
      }
    | {
        $gte: number;
      }
    | {
        $lte: number;
      };
  title?:
    | {
        $eq: string;
      }
    | {
        $neq: string;
      }
    | {
        $gt: string;
      }
    | {
        $lt: string;
      }
    | {
        $gte: string;
      }
    | {
        $lte: string;
      };
  created?:
    | {
        /** @format date-time */
        $eq: string;
      }
    | {
        /** @format date-time */
        $neq: string;
      }
    | {
        /** @format date-time */
        $gt: string;
      }
    | {
        /** @format date-time */
        $lt: string;
      }
    | {
        /** @format date-time */
        $gte: string;
      }
    | {
        /** @format date-time */
        $lte: string;
      };
  author_id?:
    | {
        $eq: number;
      }
    | {
        $neq: number;
      }
    | {
        $gt: number;
      }
    | {
        $lt: number;
      }
    | {
        $gte: number;
      }
    | {
        $lte: number;
      };
}

export interface ArticleSortExp {
  name?: "Asc" | "Desc";
  article_id?: "Asc" | "Desc";
  title?: "Asc" | "Desc";
  created?: "Asc" | "Desc";
  author_id?: "Asc" | "Desc";
}

export interface Article {
  article_id: number;
  title: string;
  /** @format date-time */
  created: string;
  author_id: number;
}

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;

export interface FullRequestParams extends Omit<RequestInit, "body"> {
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
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
  securityWorker?: (securityData: SecurityDataType | null) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown> extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = "";
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) => fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: "same-origin",
    headers: {},
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(typeof value === "number" ? value : `${value}`)}`;
  }

  protected addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  protected addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join("&");
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter((key) => "undefined" !== typeof query[key]);
    return keys
      .map((key) => (Array.isArray(query[key]) ? this.addArrayQueryParam(query, key) : this.addQueryParam(query, key)))
      .join("&");
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : "";
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string") ? JSON.stringify(input) : input,
    [ContentType.Text]: (input: any) => (input !== null && typeof input !== "string" ? JSON.stringify(input) : input),
    [ContentType.FormData]: (input: FormData) =>
      (Array.from(input.keys()) || []).reduce((formData, key) => {
        const property = input.get(key);
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === "object" && property !== null
              ? JSON.stringify(property)
              : `${property}`,
        );
        return formData;
      }, new FormData()),
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  protected mergeRequestParams(params1: RequestParams, params2?: RequestParams): RequestParams {
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

  protected createAbortSignal = (cancelToken: CancelToken): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(`${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`, {
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type && type !== ContentType.FormData ? { "Content-Type": type } : {}),
      },
      signal: (cancelToken ? this.createAbortSignal(cancelToken) : requestParams.signal) || null,
      body: typeof body === "undefined" || body === null ? null : payloadFormatter(body),
    }).then(async (response) => {
      const r = response.clone() as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const data = !responseFormat
        ? r
        : await response[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch((e) => {
              r.error = e;
              return r;
            });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data;
    });
  };
}

/**
 * @title OpenAPI specification
 * @version 1.0.0
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  authors = {
    /**
     * @description Authors select many description.
     *
     * @name GetAuthorsApi
     * @summary Query authors collection with filtering, sorting, pagination capabilities.
     * @request GET:/authors
     */
    getAuthorsApi: (
      query?: {
        filter?: AuthorFilterExp;
        sort?: AuthorSortExp;
        page?: Page;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        Author[],
        {
          success: false;
        }
      >({
        path: `/authors`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),
  };
  articles = {
    /**
     * @description Articles select many description.
     *
     * @name GetArticlesApi
     * @summary Query articles collection with filtering, sorting, pagination capabilities.
     * @request GET:/articles
     */
    getArticlesApi: (
      query?: {
        filter?: ArticleFilterExp;
        sort?: ArticleSortExp;
        page?: Page;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        Article[],
        {
          success: false;
        }
      >({
        path: `/articles`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),
  };
}
