export type Datatype = "string" | "date" | "number" | "boolean" | "float";
export type FilterTypes = "text" | "select" | "date" | "number";
export type FilterDirection = "before" | "after";
export type SortOrder = "asc" | "desc";
export type CellAlign = "left" | "center" | "right";
export type ColumnConfig = {
  key: string;
  label: string;
  filterType?: FilterTypes;
  type?: Datatype;
  sortOrder?: SortOrder;
  align?: CellAlign;
};

export type TableProps = {
  data: Array<any>;
  columns: ColumnConfig[];
  onRowClick?: (row: any) => void;
  enableFilter?: boolean;
  enableSort?: boolean;
  enableHover?: boolean;
};

export type CellProps = {
  data: any;
  type?: Datatype;
  align?: CellAlign;
};

export type FilterProps = {
  column: ColumnConfig;
  options?: any[];
  applyFilter?: (value: any, key: ColumnConfig) => void;
};

export type CompositeFilterProps = {
  type: FilterTypes;
  onChange: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => void;
};

export type SortProps = {
  column: ColumnConfig;
  applySort?: (column: ColumnConfig) => void;
};

export type FilterMemoryObj = {
  type: FilterTypes;
  direction: FilterDirection;
  value: string;
};
