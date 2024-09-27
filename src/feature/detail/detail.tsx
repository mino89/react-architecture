import { observer } from "mobx-react";
import { useDetail } from "./useDetail";
import { DateFormat } from "../../components/Utils/DateFormat";
import { Loading } from "../../components/Loading/Loading";
import { Table } from "../../components/Table/Table";

export const Detail: React.FC<{ id: number | string }> = observer(({ id }) => {
  const { patient, columnsConfig } = useDetail(id);
  return (
    <Loading
      loadingState="Loading..."
      loadedState={
        <>
          <h1>Detail</h1>
          {patient && (
            <div>
              <h2>{patient.familyName}</h2>
              <h3>{patient.givenName}</h3>
              <p>
                <DateFormat date={patient.birthDate} />
              </p>
              <p>{patient.sex}</p>
              <Table data={patient.parameters} columns={columnsConfig} />
            </div>
          )}
        </>
      }
    />
  );
});
