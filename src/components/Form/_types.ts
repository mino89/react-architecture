export type FieldType = "text" | "select" | "date" | "password";

export type OptionValue = {
  value: string;
  label: string;
};

export type FormFieldConfig = {
  key: string;
  label: string;
  type: FieldType;
  options?: OptionValue[];
  required?: boolean;
};

export type FormField = {
  config: FormFieldConfig;
  onChange?: (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => void;
  data: Record<string, any>;
};

export type FormProps = {
  fields: FormFieldConfig[];
  data: Record<string, any>;
  onSubmit: (data: any) => any;
};
