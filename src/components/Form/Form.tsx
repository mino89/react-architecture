import React from "react";
import { useForm } from "./useForm";
import { FormProps } from "./types";
import { Field } from "./Field";

export const Form: React.FC<FormProps> = (FormProps) => {
  const { data, fields, onSubmit } = FormProps;

  const { handleSubmit, handleChange, formData } = useForm(data, onSubmit);

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
      <button type="submit">Submit</button>
    </form>
  );
};
