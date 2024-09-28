import { inject, injectable } from "inversify";
import { LoadingService } from "./loading-service";
import { EmptyResponse, HttpRequestParams } from "./_types";
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
  constructor(
    @inject("LoadingService") private loadingService: LoadingService,
    @inject("UserMessagesService")
    private userMessagesService: UserMessagesService
  ) {}
  /**
   * Sends an HTTP request using the provided options and handles the response.
   *
   * @template T - The expected response type.
   * @param {HttpRequestParams<T>} options - The parameters for the HTTP request.
   * @returns {Promise<T | EmptyResponse | undefined>} - A promise that resolves to the response data, an empty response, or undefined if an error occurs.
   */
  public async request<T>(
    options: HttpRequestParams<T>
  ): Promise<T | EmptyResponse | undefined> {
    this.loadingService.start(options.loadingKey);

    try {
      const response = await fetch(options.url, {
        method: options.method,
        headers: options.headers,
        body: options.body ? JSON.stringify(options.body) : undefined,
      });

      if (response.ok) {
        return await this.handleResponse(response, options.loadingKey);
      } else {
        this.handleError(
          options.errors?.requestErrorText || "Request error",
          options.loadingKey
        );
      }
    } catch (e) {
      this.handleError(
        options.errors?.promiseErrorText || "Promise error",
        options.loadingKey
      );
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
    } catch (e) {
      return { status: response.status };
    }
  }
  /**
   * handles the error
   * @param message
   * @param loadingKey
   * @returns void
   */
  private handleError(message: string, loadingKey: string): void {
    this.loadingService.stop(loadingKey);
    this.userMessagesService.setMessage({
      type: "error",
      message,
    });
  }
}
