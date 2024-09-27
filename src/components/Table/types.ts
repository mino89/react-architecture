export type Datatype = "string" | "date" | "number" | "boolean";

export type ColumnConfig = {
    key: string;
    label: string;
    filterType?: "text" | "select";
    type?: Datatype;
    sortOrder?: boolean;
}

export type TableProps = {
    data: Array<any>;
    columns: ColumnConfig[];
    onRowClick?: (row: any) => any;
    enableFilter?: boolean;
    enableSort?: boolean;
  };

export type CellProps = {
    data: any;
    type?: Datatype
}

export type FilterProps = {
    column: ColumnConfig;
    options?: any[];
    applyFilter?: (value: any, key: string) => void;
}

export type SortProps = {
    column: ColumnConfig;
    applySort?: (column: ColumnConfig) => void;
}