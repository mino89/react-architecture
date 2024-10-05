import { Outlet, createRootRoute } from "@tanstack/react-router";
import { Layout } from "../components/Layout/Layout";
import { ToastProvider } from "../components/Toaster/ToastContext";
import Toaster from "../components/Toaster/Toaster";
import ReactLogo from "../assets/react.svg";
import packageJson from "../../package.json";
export const Route = createRootRoute({
  component: () => (
    <ToastProvider>
      <Toaster />
      <Layout
        header={
          <>
            <img className="logo-img" src={ReactLogo} alt="React Logo" />
            <h1 className="logo-title">{packageJson.name}</h1>
          </>
        }
        main={<Outlet />}
        footer={`Version: ${packageJson.version}`}
      />
    </ToastProvider>
  ),
});
