import { useEffect, useState } from "react";
import { useService } from "../../core/hooks/useService";
import { PatientService } from "../services/patient/patient-service";
import { ColumnConfig } from "../../components/Table/_types";
import { useModal } from "../../components/Modal/useModal";
import { PatientListItem } from "../services/patient/_types";

export function usePatients() {
  const service = useService<PatientService>("PatientService");
  const patients = service.patients;
  const { isOpen, openModal, closeModal } = useModal();
  const [selectedPatient, setSelectedPatient] = useState<number | string | null>(null);
  useEffect(() => {
    async function bootstrap() {
      await service.getPatients();
    }
    bootstrap();
  }, [service]);
  

  const columnsConfig: ColumnConfig[] = [
    {
      key: "familyName",
      label: "Family Name",
      filterType: "text",
      type: "string",
    },
    {
      key: "givenName",
      label: "Given Name",
      filterType: "text",
      type: "string",
    },
    {
      key: "birthDate",
      label: "Birth Date",
      filterType: "select",
      type: "date",
    },
    {
      key: "sex",
      label: "Sex",
      filterType: "select",
      type: "string",
    },
    {
      key: "numberOfParameters",
      label: "Number of Parameters",
      filterType: "text",
      type: "number",
    },
    {
      key: "hasAlarm",
      label: "Has Alarm",
      filterType: "select",
      type: "boolean",
    },
  ];

  const openDetail = (row: PatientListItem) => {
    setSelectedPatient(row.id)
    openModal();
  };

  return {
    patients,
    columnsConfig,
    isOpen,
    closeModal,
    openDetail,
    selectedPatient
  };
}
