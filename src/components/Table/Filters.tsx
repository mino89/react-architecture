import React from "react";
import { FilterProps } from "./types";
import { Alert } from "../Utils/Alert";
import { DateFormat } from "../Utils/DateFormat";
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
                  {(() => {
                    switch (column.type){
                      case "boolean":
                        return <Alert value={value} />;
                      case "date":
                        return <DateFormat date={value} />;
                      default:
                        return value;
                    }
                  })()}
                  
                </option>
              ))}
            </select>
          );
      }
}