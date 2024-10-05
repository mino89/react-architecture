import { createFileRoute, redirect } from "@tanstack/react-router";
import PatientList from "../features/components/PatientList/PatientList";
import { useService } from "../core/hooks/useService";
import { AuthService } from "../core/services/auth-service";

export const Route = createFileRoute("/")({
  beforeLoad: async () => {
    const service = useService(AuthService);
    if (!service.isLoggedIn) {
      throw redirect({
        to: "/login",
      });
    }
  },
  component: () => <PatientList />,
});
