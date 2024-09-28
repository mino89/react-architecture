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

export type ErrorResponse = {
  status: string | number;
}

export type MessagesTypes = "error" | "success" | "info" | "warning";

export type Usermessage = {
  type: MessagesTypes;
  message: string;
  duration?: number;
}

export type LoadingState = {
  loadingKey: string;
  state: boolean;
}