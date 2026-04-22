import { moduleMetadata, type Meta, type StoryObj, applicationConfig } from '@storybook/angular';
import { TableComponent } from './table.component';
import { provideRouter } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { TableType } from './table.model';

const meta: Meta<TableComponent<any>> = {
  title: 'UI/Table',
  component: TableComponent,
  decorators: [
    applicationConfig({
      providers: [
        provideRouter([]),
        importProvidersFrom(TranslateModule.forRoot())
      ],
    }),
  ],
  args: {
    items: [
      { id: '1', firstName: 'Ivan', email: 'ivan@test.com' },
      { id: '2', firstName: 'Admin', email: 'admin@test.com' }
    ],
    columns: [
      { title: 'Имя', sourceName: 'firstName', sortable: true, type: 'text' },
      { title: 'Email', sourceName: 'email', sortable: true, type: 'text' },
      { title: 'Действия', sourceName: 'action', sortable: false, type: 'action' }
    ],
    type: TableType.USER,
    isAdmin: true,
    addItemBtnLabel: 'Добавить',
    search: true
  }
};
export default meta;

type Story = StoryObj<TableComponent<any>>;

export const Default: Story = {};

export const Loading: Story = {
  args: {
    items: [],
    loading: true
  }
};
