import { observer } from "mobx-react";
import Modal from "../../../components/Modal/Modal";
import { Table } from "../../../components/Table/Table";
import { usePatients } from "../../hooks/usePatients";
import { PatientDetail } from "../PatientDetail/PatientDetail";
import { useList } from "./usePatientList";
import { Loader } from "../../../components/Loader/Loader";

import { useLogout } from "../../hooks/useLogout";

const PatientList = observer(() => {
  const { columnsConfig } = useList();
  const { patients, isOpen, selectedPatient, closeModal, openDetail } =
    usePatients();
  const {} = useLogout();

  return (
    <>
      <Loader
        loadingState="Loading..."
        loadingKey="getPatients"
        loadedState={
          <Table
            data={patients}
            columns={columnsConfig}
            enableFilter={true}
            enableSort={true}
            onRowClick={(row) => openDetail(row)}
            enableHover={true}
          />
        }
      />

      <Modal isOpen={isOpen} onClose={closeModal}>
        {selectedPatient !== null && <PatientDetail id={selectedPatient} />}
      </Modal>
    </>
  );
});

export default PatientList;
