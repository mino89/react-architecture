import { ARROW_DIRECTIONS } from "../Utils/const/arrows";
import { SortProps } from "./_types";

export const Sort: React.FC<SortProps> = (SortProps) => {
  const { column, applySort } = SortProps;
  return (
    <div onClick={() => applySort && applySort(column)}>
      {column.label}{" "}
      {(() => {
        switch (column.sortOrder){
          case "asc":
            return <>{ARROW_DIRECTIONS.UP}</>;
          case "desc":
            return <>{ARROW_DIRECTIONS.DOWN}</>;
          default:
            return"";
        }
      })()}
    </div>
  );
};
