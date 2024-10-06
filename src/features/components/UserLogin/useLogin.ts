import { useNavigate } from "@tanstack/react-router";
import { FormFieldConfig } from "../../../components/Form/_types";
import { useService } from "../../../core/hooks/useService";
import { AuthService } from "../../../core/services/auth-service";

export function useLogin() {
  const service = useService(AuthService);
  const navigate = useNavigate({ from: "/login" });
  const formData = {
    username: "",
    password: "",
  };

  const formFieldsConfig: FormFieldConfig[] = [
    {
      key: "username",
      label: "Username",
      type: "text",
      required: true,
    },
    {
      key: "password",
      label: "Password",
      type: "password",
      required: true,
    },
  ];

  const onSubmit = async (data: any) => {
    service.logIn(data.username, data.password);
    await navigate({ to: "/" });
  };

  return {
    formFieldsConfig,
    formData,
    onSubmit,
  };
}
