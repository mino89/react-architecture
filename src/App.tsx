import { observer } from "mobx-react";

import './App.css'

import { usePatients } from "./hooks/usePatients";
import { Table } from "./components/Table/Table";

const App = observer(() => {
  const {
    patients,
    columnsConfig
  } = usePatients();

  return (
    <>
      <Table 
        data={patients} 
        columns={columnsConfig}
        enableFilter={true}
        enableSort={true}
      />
    </>
  )


})

export default App
