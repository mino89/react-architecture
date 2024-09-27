import { observe } from "mobx";
import { useContext, useEffect } from "react";
import { Loading } from "../../components/Loading/Loading";
import Modal from "../../components/Modal/Modal";
import { Table } from "../../components/Table/Table";

import { usePatients } from "../../hooks/usePatients";
import { Detail } from "../detail/detail";
import { observer } from "mobx-react";
import { ToastContext } from "../../components/Toaster/ToastContext";
import { useService } from "../../core/hooks/useService";
import { UserMessagesService } from "../../core/service/user-messages-service";
import { useList } from "./useList";

const List: React.FC = observer(() => {
  useList();
  const {
    patients,
    columnsConfig,
    isOpen,
    selectedPatient,
    closeModal,
    openDetail,
  } = usePatients();


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
