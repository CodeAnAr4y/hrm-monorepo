import { AfterViewInit, ChangeDetectionStrategy, Component, effect, input, viewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TableHeader, TableItem } from './table.types';
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
    MatProgressSpinner,
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
  // paginator = viewChild(MatPaginator);
  sort = viewChild(MatSort);

  get columnKeys(): string[] {
    return this.columns().map(c => c.sourceName);
  }

  constructor() {
    effect(() => {
      this.dataSource.data = this.items();
      const sortInstance = this.sort();
      if (sortInstance) {
        this.dataSource.sort = sortInstance;
      }

      this.setupCustomAccessor();
    });
  }

  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator() ?? null;
    this.dataSource.sort = this.sort() ?? null;

  }

  private setupCustomAccessor() {
    this.dataSource.sortingDataAccessor = (item: any, property: string) => {
      if (property.includes('.')) {
        return property.split('.').reduce((obj, key) => obj?.[key], item);
      }
      return item[property];
    };

    this.dataSource.filterPredicate = (data: any, filter: string) => {
      const dataStr = JSON.stringify(data).toLowerCase();
      return dataStr.indexOf(filter) !== -1;
    };
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
