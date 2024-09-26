import { HttpClientService } from "../../core/service/http-client-service";
import { inject, injectable } from "inversify";
import { Patient } from "./types";
import { makeAutoObservable, runInAction } from "mobx";

@injectable()
export class PatientService {
  private authHeaders = {
    Authorization: `Basic ${btoa(`${process.env.VITE_API_USER}:${process.env.VITE_API_PASSWORD}`)}`,
  };
  patients: Patient[] = [];
  httpClient: HttpClientService;

  constructor(@inject("HttpClientService") httpClient: HttpClientService) {
    makeAutoObservable(this);
    this.httpClient = httpClient;
  }

  async getPatients(): Promise<void> {
    const response = await this.httpClient.request<Patient[]>({
      url: `api/GetList`,
      method: "GET",
      headers: this.authHeaders,
      errors: {
        requestErrorText: "Error getting patients",
        promiseErrorText: "Error in promise",
      },
    });

    runInAction(() => {
      if (response) {
        this.patients = response;
      }
    });
  }
}
