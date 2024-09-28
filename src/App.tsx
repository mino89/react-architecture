
import "./App.css";

import { ToastProvider } from "./components/Toaster/ToastContext";
import Toaster from "./components/Toaster/Toaster";
import List from "./features/components/list/list";

const App =() => {
  return (
    <ToastProvider>
      <Toaster />
      <List />
    </ToastProvider>
  );
};

export default App;
