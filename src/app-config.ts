import { HttpClientService } from "./core/service/http-client-service";
import { LoadingService } from "./core/service/loading-service";
import { PatientService } from "./service/patient/patient-service";

export const appConfig = {
  di: [
    {
      id: "LoadingService",
      class: LoadingService,
    },
    {
      id: "HttpClientService",
      class: HttpClientService,
    },
    {
      id: "PatientService",
      class: PatientService,
    },
  ],
};
