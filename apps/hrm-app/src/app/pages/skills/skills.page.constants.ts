import { TableHeader } from '@hrm-monorepo/hrm-lib';

export const COLUMNS: TableHeader[] = [
  { title: 'Name', sourceName: 'name', sortable: true },
  { title: 'Type', sourceName: 'type', sortable: true },
  { title: 'Category', sourceName: 'category', sortable: true },
  { title: '', sourceName: 'actions', sortable: false, type: 'action' }
]
