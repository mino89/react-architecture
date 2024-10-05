import { createLazyFileRoute } from "@tanstack/react-router";
import PatientList from "../features/components/PatientList/PatientList";

export const Route = createLazyFileRoute("/")({
  component: () => <PatientList />,
});
