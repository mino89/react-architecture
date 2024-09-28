import { ColumnConfig, FilterProps, FilterTypes } from "./_types";

export function useFilters(
  applyFilter: FilterProps["applyFilter"],
  column: ColumnConfig
) {
  const applyCompositeFilter = (
    type: FilterTypes,
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
      ,
    elementTargetPosition: "nextElement" | "previousElement"
  ) => {
    const directionEl =
      elementTargetPosition === "nextElement"
        ? (event.target.nextElementSibling as HTMLInputElement)
        : event.target;
    const valuesEl =
      elementTargetPosition === "nextElement"
        ? event.target
        : (event.target.previousElementSibling as HTMLInputElement);
    applyFilter &&
      applyFilter(
        {
          type,
          direction: directionEl.value,
          value: valuesEl.value,
        },
        column
      );
  };

  return {
    applyCompositeFilter,
  };
}
