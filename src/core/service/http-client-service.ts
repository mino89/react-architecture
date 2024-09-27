import { inject, injectable } from "inversify";
import { LoadingService } from "./loading-service";
import { EmptyResponse, HttpRequestParams } from "./types";

@injectable()
export class HttpClientService {
  private loadingService: LoadingService;

  constructor(
    @inject("LoadingService") loadingService: LoadingService
) {
    this.loadingService = loadingService;
  }

  public async request<T>(options: HttpRequestParams<T>): Promise<T | EmptyResponse | undefined> {
    try {
      this.loadingService.start(options.loadingKey);
      const response = await fetch(options.url, {
        method: options.method,
        headers: options.headers,
        body: options.body ? JSON.stringify(options.body) : undefined,
      });
      if (response.ok) {
        this.loadingService.stop(options.loadingKey);
        try{
          return await response.json();
        } catch (e) {
          return {
            status: response.status,
          };
        }
      } else {
        this.loadingService.stop(options.loadingKey);
        console.error(options.errors?.requestErrorText || "Request error");
      }
    } catch (e) {
      this.loadingService.stop(options.loadingKey);
      console.error(options.errors?.promiseErrorText || "Promise error", e);
    }
  }
}
