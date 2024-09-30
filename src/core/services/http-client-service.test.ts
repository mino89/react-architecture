import "reflect-metadata";
import { HttpClientService } from "./http-client-service";
import { LoadingService } from "./loading-service";
import { UserMessagesService } from "./user-messages-service";
import { HttpRequestParams, EmptyResponse } from "./_types";
import fetchMock from "jest-fetch-mock"; // Import fetchMock

import nock from "nock"; // Import nock

jest.mock("./loading-service");
jest.mock("./user-messages-service");

describe("HttpClientService with nock", () => {
  let httpClientService: HttpClientService;
  let loadingService: LoadingService;
  let userMessagesService: UserMessagesService;

  beforeEach(() => {
    loadingService = new LoadingService();
    userMessagesService = new UserMessagesService();
    httpClientService = new HttpClientService(
      loadingService,
      userMessagesService
    );
    fetchMock.resetMocks();
    nock.cleanAll();
  });

  it("should send a GET request and return the response data", async () => {
    const mockResponse = { data: "test" };
    fetchMock.mockResponseOnce(JSON.stringify(mockResponse));

    // Mock the web server
    nock("https://api.example.com").get("/data").reply(200, mockResponse);

    const options: HttpRequestParams<typeof mockResponse> = {
      url: "https://api.example.com/data",
      method: "GET",
      headers: { "Content-Type": "application/json" },
      loadingKey: "getData",
    };

    const response = await httpClientService.request<typeof mockResponse>(
      options
    );

    expect(response).toEqual(mockResponse);
    expect(nock.isDone()).toBe(true);
    expect(loadingService.start).toHaveBeenCalledWith(options.loadingKey);
    expect(loadingService.stop).toHaveBeenCalledWith(options.loadingKey);
  });

  it("should handle an empty response", async () => {
    fetchMock.mockResponseOnce(JSON.stringify(""));

    // Mock the web server
    nock("https://api.example.com").get("/empty").reply(200, "");

    const options: HttpRequestParams<EmptyResponse> = {
      url: "https://api.example.com/empty",
      method: "GET",
      headers: { "Content-Type": "application/json" },
      loadingKey: "getEmpty",
    };

    const response = await httpClientService.request<EmptyResponse>(options);

    expect(JSON.stringify(response)).toBe(JSON.stringify({ status: 200 }));

    expect(nock.isDone()).toBe(true);
    expect(loadingService.start).toHaveBeenCalledWith(options.loadingKey);
    expect(loadingService.stop).toHaveBeenCalledWith(options.loadingKey);
  });

  it("should handle a request error", async () => {
    // Mock the web server
    nock("https://api.example.com")
      .get("/error")
      .replyWithError("Network error");

    const options: HttpRequestParams<EmptyResponse> = {
      url: "https://api.example.com/error",
      method: "GET",
      headers: { "Content-Type": "application/json" },
      loadingKey: "getError",
      errors: {
        requestErrorText: "Request error",
        promiseErrorText: "Promise error",
      },
    };

    const response = await httpClientService.request<EmptyResponse>(options);

    expect(JSON.stringify(response)).toBe(JSON.stringify({ status: "error" }));
    expect(nock.isDone()).toBe(true); // Ensure all nock interceptors were used
    expect(loadingService.start).toHaveBeenCalledWith(options.loadingKey);
    expect(loadingService.stop).toHaveBeenCalledWith(options.loadingKey);
  });
});
