import React from "react";
import { FilterProps } from "./types";
import { Boolean } from "./Boolean";
export const Filters: React.FC<FilterProps> = (FilterProps) => {
    const { column, applyFilter,options } = FilterProps;
    switch (column.filterType) {
        case "text":
          return (
            <input
              type="text"
              onChange={(event) =>

                applyFilter && applyFilter(event.target.value, column.key)
              }
            />
          );
        case "select":
          return (
            <select
              onChange={(event) =>
                applyFilter && applyFilter(event.target.value, column.key)
              }
            >
              <option value=""> Select a value to filter</option>
              {options?.map((value, index) => (
                <option key={index} value={value}>
                  {typeof value === "boolean"
                    ? <Boolean value={value} />
                    : value}
                </option>
              ))}
            </select>
          );
      }
}