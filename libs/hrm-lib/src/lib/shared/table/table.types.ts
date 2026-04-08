export enum SortOrder {
  Asc = 'asc',
  Desc = 'desc'
}

export interface TableItem {
  id: string | number;

  [key: string]: any;
}

export interface TableHeader {
  title: string;
  sourceName: string;
  sortable: boolean;
}
