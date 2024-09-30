import { useEffect, useState } from "react";
import { useService } from "../../../core/hooks/useService";
import { PatientService } from "../../services/patient/patient-service";
import { ColumnConfig } from "../../../components/Table/_types";
import { FormFieldConfig } from "../../../components/Form/_types";
import { PatientResponse } from "../../services/patient/_types";

export function useDetail(id: number | string) {
  const service = useService(PatientService);
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
      required: true,
    },
    {
      key: "givenName",
      label: "Given Name",
      type: "text",
      required: true,
    },
    {
      key: "birthDate",
      label: "Birth Date",
      type: "date",
      required: true,
    },
    {
      key: "sex",
      label: "Sex",
      type: "select",
      required: true,
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
  }, [service, id]);

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
