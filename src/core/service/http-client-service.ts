import { inject, injectable } from "inversify";
import { LoadingService } from "./loading-service";
import { HttpRequestParams } from "./types";

@injectable()
export class HttpClientService {
  private loadingService: LoadingService;

  constructor(
    @inject("LoadingService") loadingService: LoadingService
) {
    this.loadingService = loadingService;
  }

  public async request<T>(options: HttpRequestParams<T>): Promise<T | undefined> {
    try {
      const response = await fetch(options.url, {
        method: options.method,
        headers: options.headers,
        body: options.body ? JSON.stringify(options.body) : undefined,
      });

      if (response.ok) {
        this.loadingService.stop();
        return await response.json();
      } else {
        this.loadingService.stop();
        console.error(options.errors?.requestErrorText || "Request error");
      }
    } catch (e) {
      this.loadingService.stop();
      console.error(options.errors?.promiseErrorText || "Promise error");
    }
  }
}
