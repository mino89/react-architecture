import Row from "./Row";
import Cell from "./Cell";
import { useTable } from "./useTable";
import { TableProps } from "./_types";
import { Filters } from "./Filters";
import { Sort } from "./Sort";

const Table: React.FC<TableProps> = (TableProps) => {
  const { columns, data, enableFilter, enableSort, onRowClick } = TableProps;
  const {
    sortColumn,
    generateOptions,
    filterColumn,
    tableData
  } = useTable(data);

  return (
    <table className="table-auto">
      <thead>
        <Row>
          {columns.map((column, index) => (
            <th key={index}>
              {enableSort ? (
                <Sort column={column} applySort={sortColumn} />
              ) : (
               <>{column.label}</> 
              )}

              <br />
              {enableFilter && (
                <Filters
                  column={column}
                  applyFilter={filterColumn}
                  options={generateOptions(column)}
                />
              )}
            </th>
          ))}
        </Row>
      </thead>
      <tbody>
        {tableData?.map((row, index) => (
          <Row
            key={index}
            onClick={() => (onRowClick ? onRowClick(row) : null)}
          >
            {columns.map((column, index) => (
              <Cell key={index} data={row[column.key]} type={column.type} />
            ))}
          </Row>
        ))}
      </tbody>
    </table>
  );
};

export { Table };
