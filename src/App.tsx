
import "./App.css";

import { ToastProvider } from "./components/Toaster/ToastContext";
import Toaster from "./components/Toaster/Toaster";
import List from "./feature/list/list";

const App =() => {
  return (
    <ToastProvider>
      <Toaster />
      <List />
    </ToastProvider>
  );
};

export default App;
