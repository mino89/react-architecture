import { HttpClientService } from "../../../core/services/http-client-service";
import { inject, injectable } from "inversify";
import { PatientListItem, PatientResponse } from "./_types";
import { makeAutoObservable, runInAction } from "mobx";
import { UserMessagesService } from "../../../core/services/user-messages-service";

@injectable()
export class PatientService {
  private authHeaders = {
    Authorization: `Basic ${btoa(
      `${process.env.VITE_API_USER}:${process.env.VITE_API_PASSWORD}`
    )}`,
  };
  private httpClient: HttpClientService;
  private userMessagesService: UserMessagesService;
  patients: PatientListItem[] = [];
  patient: PatientResponse = {} as PatientResponse;

  constructor(
    @inject(HttpClientService) httpClient: HttpClientService,
    @inject(UserMessagesService) userMessagesService: UserMessagesService
  ) {
    makeAutoObservable(this);
    this.httpClient = httpClient;
    this.userMessagesService = userMessagesService;
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
      loadingKey: "getPatients",
    });

    runInAction(() => {
      if (response && Array.isArray(response)) {
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
    const response = (await this.httpClient.request<PatientResponse>({
      url: `api/Get/${id}`,
      method: "GET",
      headers: this.authHeaders,
      errors: {
        requestErrorText: "Error getting patient",
        promiseErrorText: "Error in promise",
      },
      loadingKey: "getPatient",
    })) as PatientResponse;

    runInAction(() => {
      if (response) {
        this.patient = response;
      }
    });
  }

  async updatePatient(data: PatientResponse): Promise<void> {
    await this.httpClient.request<PatientResponse>({
      url: `api/Update`,
      method: "POST",
      headers: {
        ...this.authHeaders,
        "Content-Type": "application/json",
        accept: "*/*",
      },
      body: data,
      errors: {
        requestErrorText: "Error updating patient",
        promiseErrorText: "Error in promise",
      },
      loadingKey: "updatePatient",
      emptyBody: true,
    });
    this.userMessagesService.setMessage({
      type: "success",
      message: "Patient updated",
    });
  }
}
