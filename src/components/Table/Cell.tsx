import { Boolean } from "./Boolean";
import { CellProps } from "./types";

const Cell: React.FC<CellProps> = (CellProps) => {
    const { data, type } = CellProps;

    switch (type) {

        case "date":
            return (
                <td>{new Date(data).toLocaleDateString()}</td>
            );

        case "number":
            return (
                <td>{data}</td>
            );

        case "boolean":
            return (
                <td><Boolean value={data}/></td>
            );

        default:
            return (
                <td>{data}</td>
            );
    }
};

export default Cell;