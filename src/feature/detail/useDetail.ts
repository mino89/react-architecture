import { useEffect, useState } from "react";
import { useService } from "../../core/hooks/useService";
import { PatientService } from "../../service/patient/patient-service";
import { ColumnConfig } from "../../components/Table/types";
import { FormFieldConfig } from "../../components/Form/types";
import { PatientResponse } from "../../service/patient/types";
export function useDetail(id: number | string) {
  const service = useService<PatientService>("PatientService");
  const [patient, setPatient] = useState<PatientResponse>(service.patient);
  const [isEditing, setIsEditing] = useState(false);

  const columnsConfig: ColumnConfig[] = [
    {
      key: "name",
      label: "Name",
    },
    {
      key: "value",
      label: "Value",
      type: "number",
    },
    {
      key: "alarm",
      label: "Alarm",
      type: "boolean",
    },
  ];

  const formConfig: FormFieldConfig[] = [
    {
      key: "familyName",
      label: "Family Name",
      type: "text",
    },
    {
      key: "givenName",
      label: "Given Name",
      type: "text",
    },
    {
      key: "birthDate",
      label: "Birth Date",
      type: "date",
    },
    {
      key: "sex",
      label: "Sex",
      type: "select",
      options: [
        {
          value: "M",
          label: "M",
        },
        {
          value: "F",
          label: "F",
        },
      ],
    },
  ];

  useEffect(() => {
    async function bootstrap() {
      await service.getPatient(id);
      setPatient(service.patient);
    }
    bootstrap();
  }, [service]);

  const handleSubmit = async (patient: PatientResponse) => {
    await service.updatePatient(patient);
    await service.getPatients();
    setPatient(patient);
    setIsEditing(false);
  };

  return {
    patient,
    columnsConfig,
    formConfig,
    handleSubmit,
    isEditing,
    setIsEditing,
  };
}
