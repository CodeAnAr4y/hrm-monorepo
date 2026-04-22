import { type Meta, moduleMetadata, type StoryObj } from '@storybook/angular';
import { SelectComponent } from './select.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

const meta: Meta<SelectComponent> = {
  title: 'UI/Select',
  component: SelectComponent,
  decorators: [
    moduleMetadata({
      imports: [ReactiveFormsModule],
    }),
  ],
  args: {
    label: 'Выберите роль',
    placeholder: 'Не выбрано',
    options: [
      { label: 'Администратор', value: 'admin' },
      { label: 'Менеджер', value: 'manager' },
      { label: 'Пользователь', value: 'user' },
    ],
  },
};

export default meta;

type Story = StoryObj<SelectComponent>;

export const Default: Story = {
  render: (args) => {
    const control = new FormControl('admin');

    return {
      props: {
        ...args,
        control,
      },
      template: `
        <div style="width: 300px; padding: 20px;">
          <lib-select
            [label]="label"
            [placeholder]="placeholder"
            [options]="options"
            [formControl]="control"
          />
          <div style="margin-top: 10px; font-size: 12px; color: #666;">
            Выбрано: {{ control.value }}
          </div>
        </div>
      `,
    };
  },
};

export const Disabled: Story = {
  args: {
    label: 'Заблокированный выбор',
  },
  render: (args) => {
    const control = new FormControl({ value: 'user', disabled: true });
    return {
      props: { ...args, control },
      template: `
        <div style="width: 300px; padding: 20px;">
          <lib-select [label]="label" [options]="options" [formControl]="control" />
        </div>
      `,
    };
  },
};
