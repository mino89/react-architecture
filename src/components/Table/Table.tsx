import Row from "./Row";
import Cell from "./Cell";
import { useTable } from "./useTable";
import { TableProps } from "./_types";
import { Filters } from "./Filters";
import { Sort } from "./Sort";
import "./Table.css";
const Table: React.FC<TableProps> = (TableProps) => {
  const { columns, data, enableFilter, enableSort, onRowClick, enableHover } =
    TableProps;
  const {
    sortColumn,
    generateOptions,
    filterColumn,
    resetData,
    filterMemory,
    tableData,
  } = useTable(data);

  const onClickHandler = (row: any) => {
    if (onRowClick) {
      onRowClick(row);
    }
  };
  return (
    <>
      {filterMemory && Object.keys(filterMemory).length > 0 && (
        <button onClick={() => resetData()}>Reset Table Filters</button>
      )}
      <table className="table-auto">
        <thead>
          <Row>
            {columns.map((column) => (
              <th
                className={column.align ? `cell-align-${column.align}` : ""}
                key={column.key}
              >
                {enableSort ? (
                  <Sort column={column} applySort={sortColumn} />
                ) : (
                  <>{column.label}</>
                )}

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
          {!tableData?.length && (
            <Row>
              <td colSpan={columns.length} className="cell-align-center">
                No data found
              </td>
            </Row>
          )}
          {tableData?.map((row) => (
            <Row
              key={row.id}
              onClick={() => onClickHandler(row)}
              enableHover={enableHover}
            >
              {columns.map((column) => (
                <Cell
                  key={column.key}
                  data={row[column.key]}
                  type={column.type}
                  align={column.align}
                />
              ))}
            </Row>
          ))}
        </tbody>
      </table>
    </>
  );
};

export { Table };
