import { observer } from "mobx-react";
import { Form } from "../../../components/Form/Form";
import { useLogin } from "./useLogin";

export const UserLogin = observer(() => {
  const { formFieldsConfig, onSubmit, formData } = useLogin();
  return (
    <div>
      <h1>Login</h1>
      <Form
        data={formData}
        fields={formFieldsConfig}
        onSubmit={async (data) => await onSubmit(data)}
      />
    </div>
  );
});
