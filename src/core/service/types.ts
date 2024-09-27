export type HttpRequestParams<T> = {
    url: string;
    method: string;
    headers?: Record<string, string>;
    body?: T | string;
    errors?: {
      requestErrorText?: string;
      promiseErrorText?: string;
    };
    loadingKey: string; 
    emptyBody?: boolean;  
  };


export type EmptyResponse = {
  status: string | number;
}