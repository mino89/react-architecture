import { observer } from "mobx-react";
import { useDetail } from "./usePatientDetail";
import { DateFormat } from "../../../components/Utils/DateFormat";
import { Table } from "../../../components/Table/Table";
import { Form } from "../../../components/Form/Form";
import { Loader } from "../../../components/Loader/Loader";
import "./PatientDetail.css";
export const PatientDetail: React.FC<{ id: number | string }> = observer(
  ({ id }) => {
    const {
      patient,
      columnsConfig,
      formConfig,
      handleSubmit,
      isEditing,
      setIsEditing,
    } = useDetail(id);
    return (
      <Loader
        loadingState="Loading..."
        loadingKey="getPatient"
        loadedState={
          <>
            <h1>Detail</h1>
            {patient && (
              <Loader
                loadingState="Loading..."
                loadingKey="updatePatient"
                loadedState={
                  <>
                    {isEditing ? (
                      <>
                        <button
                          className="alt"
                          onClick={() => setIsEditing(false)}
                        >
                          &times;
                        </button>
                        <Form
                          fields={formConfig}
                          data={patient}
                          onSubmit={(e) => handleSubmit(e)}
                        />
                      </>
                    ) : (
                      <>
                        <div className="patient-info">
                          <div>
                            <small>Family Name</small>
                            <h2>{patient.familyName}</h2>
                          </div>
                          <div>
                            <small>Given Name</small>
                            <h3>{patient.givenName}</h3>
                          </div>
                          <div>
                            <small>Birth Date</small>
                            <b>
                              <DateFormat date={patient.birthDate} />
                            </b>
                          </div>
                          <div>
                            <small>Sex</small>
                            <b>{patient.sex}</b>
                          </div>
                        </div>
                        <hr />
                        <button onClick={() => setIsEditing(true)}>Edit</button>
                      </>
                    )}
                    <h2>Parameters</h2>
                    <hr />
                    <Table data={patient.parameters} columns={columnsConfig} />
                  </>
                }
              />
            )}
          </>
        }
      />
    );
  }
);
