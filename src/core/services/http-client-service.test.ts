import "reflect-metadata";
import { HttpClientService } from "./http-client-service";
import { LoadingService } from "./loading-service";
import { UserMessagesService } from "./user-messages-service";
import { HttpRequestParams, EmptyResponse } from "./_types";
import fetchMock from "jest-fetch-mock"; // Import fetchMock

import nock from "nock"; // Import nock
import { AuthService } from "./auth-service";

jest.mock("./loading-service");
jest.mock("./user-messages-service");

describe("HttpClientService", () => {
  let httpClientService: HttpClientService;
  let loadingService: LoadingService;
  let userMessagesService: UserMessagesService;
  let authService: AuthService;
  const OLD_ENV = process.env;

  beforeEach(() => {
    process.env.VITE_API_USER = "test";
    process.env.VITE_API_PASSWORD = "test";
    loadingService = new LoadingService();
    userMessagesService = new UserMessagesService();
    authService = new AuthService();
    httpClientService = new HttpClientService(
      loadingService,
      userMessagesService,
      authService
    );
    fetchMock.resetMocks();
    nock.cleanAll();
  });

  afterEach(() => {
    process.env = OLD_ENV;
  });

  it("should return an error if env variables are not set", async () => {
    delete process.env.VITE_API_USER;
    delete process.env.VITE_API_PASSWORD;

    const options: HttpRequestParams<Record<string, string>> = {
      url: "https://api.example.com/data",
      method: "GET",
      headers: { "Content-Type": "application/json" },
      loadingKey: "getData",
    };

    await expect(
      httpClientService.request<Record<string, string>>(options)
    ).rejects.toThrow("API user and password not set in environment variable");
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

    const response =
      await httpClientService.request<typeof mockResponse>(options);

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
