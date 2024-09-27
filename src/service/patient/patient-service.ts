import { HttpClientService } from "../../core/service/http-client-service";
import { inject, injectable } from "inversify";
import { Patient, PatientListItem, PatientResponse } from "./types";
import { makeAutoObservable, runInAction } from "mobx";

@injectable()
export class PatientService {
  private authHeaders = {
    Authorization: `Basic ${btoa(
      `${process.env.VITE_API_USER}:${process.env.VITE_API_PASSWORD}`
    )}`,
  };
  patients: PatientListItem[] = [];
  patient: PatientResponse | null = null;
  httpClient: HttpClientService;

  constructor(@inject("HttpClientService") httpClient: HttpClientService) {
    makeAutoObservable(this);
    this.httpClient = httpClient;
  }

  async getPatients(): Promise<void> {
    const response = await this.httpClient.request<PatientResponse[]>({
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
        const parsedResponse: PatientListItem[] = response.map((patient) => {
          const { parameters, ...rest } = patient;
          const numberOfParameters = parameters.length;
          const hasAlarm = parameters.some((parameter) => parameter.alarm);
          return {
            ...rest,
            numberOfParameters,
            hasAlarm,
          };
        });
        this.patients = parsedResponse;
      }
    });
  }

  async getPatient(id: number | string): Promise<void> {
    const response = await this.httpClient.request<PatientResponse>({
      url: `api/Get/${id}`,
      method: "GET",
      headers: this.authHeaders,
      errors: {
        requestErrorText: "Error getting patient",
        promiseErrorText: "Error in promise",
      },
    });

    runInAction(() => {
      if (response) {
        this.patient = response;
      }
    });
  }
}
