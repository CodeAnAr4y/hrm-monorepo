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
  type?: 'text' | 'image' | 'action' | 'date';
}


export interface UsersTableData {
  id: string;
  avatar: string;
  firstName: string;
  lastName: string;
  email: string;
  department: string;
  position: string;
}

export enum TableType {
  USER,
  CV
}
