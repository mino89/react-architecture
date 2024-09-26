import { observer } from "mobx-react";

import './App.css'
import { useService } from "./core/hooks/useService";
import { PatientService } from "./service/patient/patient-service";
import { useEffect } from "react";

const App = observer(() => {
  const data = useService<PatientService>("PatientService");

  useEffect(() => {
    async function bootstrap(){
      await data.getPatients()
    }
    bootstrap()
    console.log(data.patients)
  }, [data])
  return (
    <>
      App content
    </>
  )
})

export default App
