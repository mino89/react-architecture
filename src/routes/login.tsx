import { createFileRoute, redirect } from "@tanstack/react-router";
import { useService } from "../core/hooks/useService";
import { AuthService } from "../core/services/auth-service";
import { UserLogin } from "../features/components/UserLogin/UserLogin";

export const Route = createFileRoute("/login")({
  beforeLoad: async () => {
    const service = useService(AuthService);
    if (service.isLoggedIn) {
      throw redirect({
        to: "/",
        search: {
          redirect: location.href,
        },
      });
    }
  },
  component: () => <UserLogin />,
});
