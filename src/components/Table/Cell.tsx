import { DateFormat } from "../Utils/DateFormat";
import { Alert } from "../Utils/Alert";
import { CellProps } from "./types";

const Cell: React.FC<CellProps> = (CellProps) => {
    const { data, type } = CellProps;

    switch (type) {

        case "date":
            return (
                <td><DateFormat date={data}/></td>
            );

        case "number":
            return (
                <td>{data}</td>
            );

        case "boolean":
            return (
                <td><Alert value={data}/></td>
            );

        default:
            return (
                <td>{data}</td>
            );
    }
};

export default Cell;