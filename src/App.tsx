import "./App.css";

import { ToastProvider } from "./components/Toaster/ToastContext";
import Toaster from "./components/Toaster/Toaster";
import PatientList from "./features/components/PatientList/PatientList";
import ReactLogo from "./assets/react.svg";
import packageJson from "../package.json";
import { Layout } from "./components/Layout/Layout";

const App = () => {
  return (
    <ToastProvider>
      <Toaster />
      <Layout
        header={
          <>
            <img className="logo-img" src={ReactLogo} alt="React Logo" />
            <h1 className="logo-title">{packageJson.name}</h1>
          </>
        }
        main={<PatientList />}
        footer={`Version: ${packageJson.version}`}
      />
    </ToastProvider>
  );
};

export default App;
