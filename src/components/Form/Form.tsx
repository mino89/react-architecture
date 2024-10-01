import React from "react";
import { useForm } from "./useForm";
import { FormProps } from "./_types";
import { Field } from "./Field";
import "./Form.css";
export const Form: React.FC<FormProps> = (FormProps) => {
  const { data, fields, onSubmit } = FormProps;

  const { handleSubmit, handleChange, formData, disabled } = useForm(
    data,
    onSubmit
  );

  return (
    <form onSubmit={handleSubmit}>
      {fields.map((field) => {
        return (
          <fieldset key={field.key}>
            <Field
              config={field}
              onChange={(e) => handleChange(e)}
              data={formData}
            />
          </fieldset>
        );
      })}
      <fieldset>
        <button disabled={disabled} type="submit">
          Submit
        </button>
      </fieldset>
    </form>
  );
};
