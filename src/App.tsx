
import "./App.css";

import { ToastProvider } from "./components/Toaster/ToastContext";
import Toaster from "./components/Toaster/Toaster";
import PatientList from "./features/components/PatientList/PatientList";

const App =() => {
  return (
    <ToastProvider>
      <Toaster />
      <PatientList />
    </ToastProvider>
  );
};

export default App;
