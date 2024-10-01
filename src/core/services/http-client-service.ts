import { inject, injectable } from "inversify";
import { LoadingService } from "./loading-service";
import { EmptyResponse, ErrorResponse, HttpRequestParams } from "./_types";
import { UserMessagesService } from "./user-messages-service";
/**
 * Service for sending HTTP requests.
 * @class HttpClientService
 * @template T - The expected response type.
 * @param {LoadingService} loadingService - The loading service.
 * @param {UserMessagesService} userMessagesService - The user messages service.
 * @method request - Sends an HTTP request using the provided options and handles the response.
 */
@injectable()
export class HttpClientService {
  readonly loadingService: LoadingService;
  readonly userMessagesService: UserMessagesService;
  readonly authHeaders = {
    Authorization: `Basic ${btoa(
      `${process.env.VITE_API_USER}:${process.env.VITE_API_PASSWORD}`
    )}`,
  };

  constructor(
    @inject(LoadingService) loadingService: LoadingService,
    @inject(UserMessagesService)
    userMessagesService: UserMessagesService
  ) {
    this.loadingService = loadingService;
    this.userMessagesService = userMessagesService;
  }
  /**
   * Sends an HTTP request using the provided options and handles the response.
   *
   * @template T - The expected response type.
   * @param {HttpRequestParams<T>} options - The parameters for the HTTP request.
   * @returns {Promise<T | EmptyResponse | ErrorResponse>} - A promise that resolves to the response data, an empty response, or undefined if an error occurs.
   */
  public async request<T>(
    options: HttpRequestParams<T>
  ): Promise<T | EmptyResponse | ErrorResponse> {
    this.loadingService.start(options.loadingKey);
    this.checkAuthParams(options);
    try {
      const response = await fetch(options.url, {
        method: options.method,
        headers: {
          ...this.authHeaders,
          ...options.headers,
        },
        body: options.body ? JSON.stringify(options.body) : undefined,
      });

      if (response.ok) {
        return await this.handleResponse(response, options.loadingKey);
      } else {
        this.handleError(
          options.errors?.requestErrorText || "Request error",
          options.loadingKey
        );
        return { status: response.status };
      }
    } catch {
      this.handleError(
        options.errors?.promiseErrorText || "Promise error",
        options.loadingKey
      );
      return { status: "error" };
    }
  }
  /**
   * handles the response from the server
   * @param response
   * @param loadingKey
   * @returns Promise<T | EmptyResponse>
   */
  private async handleResponse<T>(
    response: Response,
    loadingKey: string
  ): Promise<T | EmptyResponse> {
    this.loadingService.stop(loadingKey);
    try {
      return await response.json();
    } catch {
      return { status: response.status };
    }
  }
  /**
   * handles the error
   * @param message
   * @param loadingKey
   * @returns void
   */
  private handleError(
    message: string,
    loadingKey: string,
    duration = 3000
  ): void {
    this.loadingService.stop(loadingKey);
    this.userMessagesService.setMessage({
      type: "error",
      message,
      duration,
    });
  }

  private checkAuthParams<T>(options: HttpRequestParams<T>) {
    if (!process.env.VITE_API_USER || !process.env.VITE_API_PASSWORD) {
      this.handleError(
        "API user and password not set",
        options.loadingKey,
        30000
      );
      throw new Error("API user and password not set in environment variable");
    }
  }
}
