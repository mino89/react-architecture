import { useEffect, useState } from "react";
import { useService } from "../../core/hooks/useService";
import { PatientService } from "../../service/patient/patient-service";
import { ColumnConfig } from "../../components/Table/types";
export function useDetail(id: number | string) {
  const service = useService<PatientService>("PatientService");
  const [patient, setPatient] = useState(service.patient);

  const columnsConfig: ColumnConfig[] = [
    {
      key: "name",
      label: "Name",
    },
    {
        key: "value",
        label: "Value",
        type: "number"
    },
    {
        key: "alarm",
        label: "Alarm",
        type: "boolean",
    }
  ];

  useEffect(() => {
    async function bootstrap() {
      await service.getPatient(id);
      setPatient(service.patient);
    }
    bootstrap();
  }, [service]);

  return { patient, columnsConfig };
}
