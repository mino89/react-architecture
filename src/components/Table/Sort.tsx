import { SortProps } from "./_types";

export const Sort: React.FC<SortProps> = (SortProps) => {
  const { column, applySort } = SortProps;
  return (
    <div onClick={() => applySort && applySort(column)}>
      {column.label}{" "}
      {column.sortOrder === undefined ? "" : column.sortOrder ? "▲" : "▼"}
    </div>
  );
};
