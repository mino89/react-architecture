import { observer } from "mobx-react";

import "./App.css";

import { usePatients } from "./hooks/usePatients";
import { Table } from "./components/Table/Table";
import { Loading } from "./components/Loading/Loading";
import Modal from "./components/Modal/Modal";
import { Detail } from "./feature/detail/detail";

const App = observer(() => {
  const { 
    patients, 
    columnsConfig, 
    isOpen, 
    selectedPatient,
    closeModal, 
    openDetail } = usePatients();

  return (
    <>
      <Loading
        loadingState="Loading..."
        loadingKey="getPatients"
        loadedState={
          <Table
            data={patients}
            columns={columnsConfig}
            enableFilter={true}
            enableSort={true}
            onRowClick={(row) => openDetail(row)}
          />
        }
      />

      <Modal isOpen={isOpen} onClose={closeModal}>
        <div>Modal Content</div>
        {selectedPatient !== null && <Detail id={selectedPatient} />}
      </Modal>
    </>
  );
});

export default App;
