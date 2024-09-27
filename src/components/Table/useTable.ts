import { useState, useEffect } from "react";
import { ColumnConfig } from "./types";

export function useTable(data: Array<any>) {
  const [tableData, setTableData] = useState(data);
  const [filterMemory, setFilterMemory] = useState<Record<string, string>>({});

  useEffect(() => {
    setTableData(data);
    filterData();
  }, [data, filterMemory]);

  const sortColumn = (column: ColumnConfig) => {
    column.sortOrder = !column.sortOrder;
    const sortedData = [...tableData].sort((a: any, b: any) => {
      if (a[column.key] < b[column.key]) {
        return column.sortOrder ? -1 : 1;
      }
      if (a[column.key] > b[column.key]) {
        return column.sortOrder ? 1 : -1;
      }
      return 0;
    });
    setTableData([...sortedData]);
  };


  const updateFilterMemory = (column: string, value: string) => {
    setFilterMemory((prevFilterMemory) => {
      if (!value) {
        const { [column]: _, ...rest } = prevFilterMemory;
        return rest;
      }
      return { ...prevFilterMemory, [column]: value };
    });
  };

  const filterColumn = (input: string, column: string) => {
    updateFilterMemory(column, input);
  };

  const filterData = () => {
    const filteredData = data?.filter((item: any) => {
      return Object.keys(filterMemory).every((key) => {
        return toSearchString(item[key]).includes(
          toSearchString(filterMemory[key])
        );
      });
    });

    if (Object.keys(filterMemory).length === 0) {
      setTableData(data);
      return;
    }
    setTableData([...filteredData]);
  };

  const generateOptions = (column: ColumnConfig) => {
    return data
      ?.map((row) => row[column.key])
      ?.filter((value, index, self) => {
        return self.indexOf(value) === index
      });

  }

  const toSearchString = (value: number | string) => {
    return value?.toString().toLowerCase();
  };

  const resetData = () => {
    setTableData(data);
  };

  return { tableData, sortColumn, filterColumn, resetData, generateOptions };
}
