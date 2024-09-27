import { observer } from "mobx-react";
import { useDetail } from "./useDetail";
import { DateFormat } from "../../components/Utils/DateFormat";
import { Loading } from "../../components/Loading/Loading";
import { Table } from "../../components/Table/Table";
import { Form } from "../../components/Form/Form";

export const Detail: React.FC<{ id: number | string }> = observer(({ id }) => {
  const {
    patient,
    columnsConfig,
    formConfig,
    handleSubmit,
    isEditing,
    setIsEditing,
  } = useDetail(id);
  return (
    <Loading
      loadingState="Loading..."
      loadingKey="getPatient"
      loadedState={
        <>
          <h1>Detail</h1>
          {patient && (
            <Loading
              loadingState="Loading..."
              loadingKey="updatePatient"
              loadedState={
                <>
                  {isEditing ? (
                    <>
                      <Form
                        fields={formConfig}
                        data={patient}
                        onSubmit={(e) => handleSubmit(e)}
                      />
                      <button onClick={() => setIsEditing(false)}>
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <div>
                        <h2>{patient.familyName}</h2>
                        <h3>{patient.givenName}</h3>
                        <p>
                          <DateFormat date={patient.birthDate} />
                        </p>
                        <p>{patient.sex}</p>
                      </div>
                      <button onClick={() => setIsEditing(true)}>Edit</button>
                    </>
                  )}

                  <Table data={patient.parameters} columns={columnsConfig} />
                </>
              }
            ></Loading>
          )}
        </>
      }
    />
  );
});
