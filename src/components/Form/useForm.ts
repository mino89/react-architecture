import { useEffect, useState } from "react";

export const useForm = (data: any, onSubmit: Function) => {
  const [formData, setFormData] = useState<any>(data);
  const [disabled, setDisabled] = useState<boolean>(false);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formData);
  };

  useEffect(() => {
    setDisabledIfEqual();
  }, [formData]);

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const setDisabledIfEqual = () => {

    const formDataPlain = {...formData}
    const dataPlain = {...data}
    const isEqual = Object.keys(formDataPlain).every(key => formDataPlain[key] === dataPlain[key]);
    setDisabled(isEqual);
  };

  return {
    formData,
    setData: setFormData,
    handleSubmit,
    handleChange,
    disabled,
  };
};
