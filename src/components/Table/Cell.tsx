import { DateFormat } from "../Utils/DateFormat";
import { Alert } from "../Utils/Alert";
import { CellProps } from "./_types";

const Cell: React.FC<CellProps> = (CellProps) => {
  const { data, type, align } = CellProps;

  switch (type) {
    case "date":
      return (
        <td className={align ? `cell-align-${align}` : ""}>
          <DateFormat date={data} />
        </td>
      );

    case "float":
      return (
        <td className={align ? `cell-align-${align}` : ""}>
          {parseFloat(data).toFixed(2)}
        </td>
      );

    case "number":
      return (
        <td className={align ? `cell-align-${align}` : ""}>{parseInt(data)}</td>
      );
    case "boolean":
      return (
        <td className={align ? `cell-align-${align}` : ""}>
          <Alert value={data} />
        </td>
      );

    default:
      return <td className={align ? `cell-align-${align}` : ""}>{data}</td>;
  }
};

export default Cell;
