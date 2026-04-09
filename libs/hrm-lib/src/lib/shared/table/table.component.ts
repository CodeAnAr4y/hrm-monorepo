import { AfterViewInit, ChangeDetectionStrategy, Component, effect, input, viewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TableHeader, TableItem } from './table.model';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'lib-table',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatFormFieldModule,
    MatIcon,
    RouterLink
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent<T extends TableItem> implements AfterViewInit {
  items = input.required<T[]>();
  columns = input.required<TableHeader[]>();
  loading = input<boolean>(false);

  dataSource = new MatTableDataSource<T>([]);
  sort = viewChild(MatSort);

  get columnKeys(): string[] {
    return this.columns().map(c => c.sourceName);
  }

  constructor() {
    effect(() => {
      this.dataSource.data = this.items();
    });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort() ?? null;
    this.dataSource.sortingDataAccessor = (item: any, property: string) => {
      const value = property.split('.').reduce((obj, key) => obj?.[key], item);
      return value.toLowerCase();
    };
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
