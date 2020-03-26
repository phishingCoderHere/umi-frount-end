export interface TableListItem {
  firstName?: string;
  lastName?: string;
  imageUrl?: string;
  activated?: boolean;
  email: string;
  login: string;
  authorities: string[];
  id: string;
}

export interface TableListPagination {
  total: number;
  pageSize: number;
  current: number;
}

export interface TableListData {
  list: TableListItem[];
  pagination: Partial<TableListPagination>;
}

export interface TableListParams {
  sorter?: string;
  email?: string;
  authorities?: string[];
  id?: string;
  login?: string;
  firstName?: string;
  lastName?: string;
  imageUrl?: string;
  activated?: boolean;
  key?: number;
  pageSize?: number;
  currentPage?: number;
}
