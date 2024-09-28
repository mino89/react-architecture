import React from "react";
import { useForm } from "./useForm";
import { FormProps } from "./_types";
import { Field } from "./Field";

export const Form: React.FC<FormProps> = (FormProps) => {
  const { data, fields, onSubmit } = FormProps;

  const { handleSubmit, handleChange, formData, disabled } = useForm(data, onSubmit);

  return (
    <form onSubmit={handleSubmit}>
      {fields.map((field) => {
        return (
          <Field
            key={field.key}
            config={field}
            onChange={(e) => handleChange(e)}
            data={formData}
          />
        );
      })}
      <button disabled={disabled} type="submit">Submit</button>
    </form>
  );
};
