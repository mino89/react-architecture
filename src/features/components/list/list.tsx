import { observer } from "mobx-react";
import { Loading } from "../../../components/Loading/Loading";
import Modal from "../../../components/Modal/Modal";
import { Table } from "../../../components/Table/Table";
import { usePatients } from "../../hooks/usePatients";
import { Detail } from "../detail/detail";
import { useList } from "./useList";

const List: React.FC = observer(() => {
  const { columnsConfig } = useList();
  const { patients, isOpen, selectedPatient, closeModal, openDetail } =
    usePatients();

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

export default List;
