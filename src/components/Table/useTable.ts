import { useState, useEffect } from "react";
import { ColumnConfig, FilterDirection, FilterMemoryObj } from "./_types";

export function useTable(data: Array<any>) {
  const [tableData, setTableData] = useState(data);
  const [filterMemory, setFilterMemory] = useState<
    Record<string, string | FilterMemoryObj>
  >({});
  const [filteredData, setFilteredData] = useState<Array<any>>([]);
  useEffect(() => {
    setTableData(data);
    filterData();
  }, [data, filterMemory]);

  const sortColumn = (column: ColumnConfig) => {
    column.sortOrder = setColumnSortOrder(column);
    const dataOrigin = filteredData.length > 0 ? filteredData : tableData;
    const sortedData = [...dataOrigin].sort((a: any, b: any) => {
      switch (column.sortOrder) {
        case "asc":
          return a[column.key] > b[column.key] ? 1 : -1;
        case "desc":
          return a[column.key] < b[column.key] ? 1 : -1;
        default:
          return 0;
      }
    });

    setTableData(
      !column.sortOrder
        ? filteredData.length > 0
          ? [...filteredData]
          : [...data]
        : [...sortedData]
    );
  };

  const setColumnSortOrder = (column: ColumnConfig) => {
    if (!column.sortOrder) {
      return "desc";
    } else if (column.sortOrder === "desc") {
      return "asc";
    } else {
      return undefined;
    }
  };

  const updateFilterMemory = (
    column: ColumnConfig,
    value: string | FilterMemoryObj
  ) => {
    setFilterMemory((prevFilterMemory) => {
      if (!value) {
        const { [column.key]: _, ...rest } = prevFilterMemory;
        return rest;
      }
      return { ...prevFilterMemory, [column.key]: value };
    });
  };

  const filterColumn = (input: string, column: ColumnConfig) => {
    updateFilterMemory(column, input);
  };

  const filterData = () => {
    const filteredDataResult = data?.filter((item: any) => {
      return Object.keys(filterMemory).every((key) => {
        if (typeof filterMemory[key] === "object" && filterMemory[key].type) {
          switch (filterMemory[key].type) {
            case "number":
              return filterNumbers(
                parseFloat(filterMemory[key].value),
                parseFloat(item[key]),
                filterMemory[key].direction
              );
            case "date":
              return filterNumbers(
                new Date(filterMemory[key].value).getTime(),
                new Date(item[key]).getTime(),
                filterMemory[key].direction
              );
          }
        } else {
          return toSearchString(item[key]).includes(
            toSearchString(filterMemory[key] as string)
          );
        }
      });
    });

    if (Object.keys(filterMemory).length === 0) {
      setTableData(data);
      return;
    }
    setFilteredData([...filteredDataResult]);
    setTableData([...filteredDataResult]);
  };

  const generateOptions = (column: ColumnConfig) => {
    return data
      ?.map((row) => row[column.key])
      ?.filter((value, index, self) => {
        return self.indexOf(value) === index;
      });
  };

  const filterNumbers = (
    from: number,
    to: number,
    direction: FilterDirection
  ) => {
    if (isNaN(from) || isNaN(to)) {
      return true;
    }
    if (direction === "after") {
      return to >= from;
    } else {
      return to <= from;
    }
  };

  const toSearchString = (value: number | string) => {
    return value?.toString().toLowerCase().toString();
  };

  const resetData = () => {
    setFilterMemory({});
    setTableData(data);
  };

  return {
    tableData,
    filterMemory,
    sortColumn,
    filterColumn,
    resetData,
    generateOptions,
  };
}
