export type HttpRequestParams<T> = {
    url: string;
    method: string;
    headers?: Record<string, string>;
    body?: T;
    errors?: {
      requestErrorText?: string;
      promiseErrorText?: string;
    };
    loadingKey: string; 
  };