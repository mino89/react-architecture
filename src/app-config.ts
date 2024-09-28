import { HttpClientService } from "./core/services/http-client-service";
import { LoadingService } from "./core/services/loading-service";
import { UserMessagesService } from "./core/services/user-messages-service";
import { PatientService } from "./features/services/patient/patient-service";

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
    {
      id: "UserMessagesService",
      class: UserMessagesService,
    }
  ],
};
