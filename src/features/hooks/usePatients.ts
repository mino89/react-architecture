import { useEffect, useState } from "react";
import { useService } from "../../core/hooks/useService";
import { PatientService } from "../services/patient/patient-service";
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
  

  const openDetail = (row: PatientListItem) => {
    setSelectedPatient(row.id)
    openModal();
  };

  return {
    patients,
    isOpen,
    closeModal,
    openDetail,
    selectedPatient
  };
}
