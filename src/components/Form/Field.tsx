import { FormField } from "./_types";

export const Field: React.FC<FormField> = (FormField) => {
    const { config, onChange, data } = FormField;
    switch (config.type) {
        case "select":
            return (
                <select
                    key={config.key}
                    name={config.key}
                    value={data[config.key]}
                    required={config.required}
                    onChange={(e) => onChange && onChange(e)}
                >
                    {config.options?.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            );
        case "date":
            return (
                <input
                    key={config.key}
                    name={config.key}
                    type="date"
                    required={config.required}
                    value={new Date(data[config.key]).toISOString().split("T")[0]}
                    onChange={(e) => onChange && onChange(e)}
                />
            );
        default:
            return (
                <input
                    key={config.key}
                    name={config.key}
                    required={config.required}
                    value= {data[config.key]}
                    onChange={(e) => onChange && onChange(e)}
                />
            )
    }
}