import React from "react";
import { CompositeFilterProps, FilterProps } from "./_types";
import { Alert } from "../Utils/Alert";
import { DateFormat } from "../Utils/DateFormat";
import { ARROW_DIRECTIONS } from "../Utils/const/arrows";
import { useFilters } from "./useFilters";

export const CompositefilterSelect: React.FC<CompositeFilterProps> = (
  CompositeFilterProps
) => {
  const { onChange } = CompositeFilterProps;
  return (
    <select onChange={onChange}>
      <option value="after">{ARROW_DIRECTIONS.RIGHT}</option>
      <option value="before">{ARROW_DIRECTIONS.LEFT}</option>
    </select>
  );
};

export const Filters: React.FC<FilterProps> = (FilterProps) => {
  const { column, applyFilter, options } = FilterProps;
  const { applyCompositeFilter } = useFilters(applyFilter, column);

  switch (column.filterType) {
    case "text":
      return (
        <input
          type="text"
          name="text"
          placeholder="Enter a value to filter"
          onChange={(event) =>
            applyFilter && applyFilter(event.target.value, column)
          }
        />
      );
    case "date":
      return (
        <div className="inputs-group">
          <input
            type="date"
            name="date"
            id="date"
            onChange={(e) => applyCompositeFilter("date", e, "nextElement")}
          />
          <CompositefilterSelect
            type="date"
            onChange={(e) => applyCompositeFilter("date", e, "previousElement")}
          />
        </div>
      );
    case "number":
      return (
        <div className="inputs-group">
          <input
            type="number"
            name="number"
            id="number"
            placeholder="Enter a number"
            onChange={(e) => applyCompositeFilter("number", e, "nextElement")}
          />
          <CompositefilterSelect
            type="number"
            onChange={(e) =>
              applyCompositeFilter("number", e, "previousElement")
            }
          />
        </div>
      );
    case "select":
      return (
        <select
          onChange={(event) =>
            applyFilter && applyFilter(event.target.value, column)
          }
        >
          <option value=""> Select a value to filter</option>
          {options?.map((value, index) => (
            <option key={index} value={value}>
              {(() => {
                switch (column.type) {
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
};
