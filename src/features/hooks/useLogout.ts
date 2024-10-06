import { useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { useService } from "../../core/hooks/useService";
import { AuthService } from "../../core/services/auth-service";

export function useLogout() {
  const auth = useService(AuthService);
  //   const navigate = useNavigate({ from: "/" });
  const logoutApp = (unauthorized: boolean = false) => {
    auth.logOut();
    // temporary solution to redirect to login page
    window.location.href = "/login";
    if (unauthorized) {
      window.location.href = "/login?unauthorized=true";
    }
    // TODO: understand why this is not working
    //   navigate({ to: "/login" });
  };

  useEffect(() => {
    if (auth.mustLogOut) {
      logoutApp(true);
    }
  }, [auth.mustLogOut]);

  return {
    auth,
    logoutApp,
    isLoggedIn: auth.isLoggedIn,
  };
}
