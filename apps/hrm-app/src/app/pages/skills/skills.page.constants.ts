import { TableHeader } from '@hrm-monorepo/hrm-lib';

export const COLUMNS: TableHeader[] = [
  { title: 'skills.list.table.name', sourceName: 'name', sortable: true },
  { title: 'skills.list.table.type', sourceName: 'type', sortable: true },
  { title: 'skills.list.table.category', sourceName: 'category', sortable: true },
  { title: '', sourceName: 'actions', sortable: false, type: 'action' }
]
