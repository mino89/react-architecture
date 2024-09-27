import { inject, injectable } from "inversify";
import { LoadingService } from "./loading-service";
import { EmptyResponse, HttpRequestParams } from "./types";
import { UserMessagesService } from "./user-messages-service";

@injectable()
export class HttpClientService {
  private loadingService: LoadingService;
  private userMessagesService: UserMessagesService;
  constructor(
    @inject("LoadingService") loadingService: LoadingService,
    @inject("UserMessagesService") userMessagesService: UserMessagesService
  ) {
    this.loadingService = loadingService;
    this.userMessagesService = userMessagesService;
  }

  public async request<T>(
    options: HttpRequestParams<T>
  ): Promise<T | EmptyResponse | undefined> {
    try {
      this.loadingService.start(options.loadingKey);
      const response = await fetch(options.url, {
        method: options.method,
        headers: options.headers,
        body: options.body ? JSON.stringify(options.body) : undefined,
      });
      if (response.ok) {
        this.loadingService.stop(options.loadingKey);
        try {
          return await response.json();
        } catch (e) {
          return {
            status: response.status,
          };
        }
      } else {
        this.loadingService.stop(options.loadingKey);
        this.userMessagesService.setMessage({
          type: "error",
          message: options.errors?.requestErrorText || "Request error",
        });
      }
    } catch (e) {
      this.loadingService.stop(options.loadingKey);
      this.userMessagesService.setMessage({
        type: "error",
        message: options.errors?.promiseErrorText || "Promise error",
      });
    }
  }
}
