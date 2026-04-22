import { type Meta, moduleMetadata, type StoryObj } from '@storybook/angular';
import { MultiSelectComponent } from '@hrm-monorepo/hrm-lib';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

const meta: Meta<MultiSelectComponent> = {
  title: 'UI/MultiSelect',
  component: MultiSelectComponent,
  decorators: [
    moduleMetadata({
      imports: [ReactiveFormsModule],
    }),
  ],
  args: {
    label: 'Выберите навыки',
    placeholder: 'Поиск...',
    options: [
      { label: 'Angular', value: 'angular' },
      { label: 'TypeScript', value: 'ts' },
      { label: 'Storybook', value: 'sb' },
      { label: 'NX', value: 'nx' },
    ],
  },
};

export default meta;

type Story = StoryObj<MultiSelectComponent>;

export const Default: Story = {
  render: (args) => {
    // Инициализируем контрол с предустановленными значениями
    const control = new FormControl(['angular', 'ts']);

    return {
      props: {
        ...args,
        control,
      },
      template: `
        <div style="width: 400px; padding: 20px;">
          <lib-multi-select
            [label]="label"
            [placeholder]="placeholder"
            [options]="options"
            [formControl]="control"
          />
          <div style="margin-top: 20px; font-size: 12px; color: gray;">
            Текущее значение: {{ control.value | json }}
          </div>
        </div>
      `,
    };
  },
};

export const Disabled: Story = {
  render: (args) => {
    const control = new FormControl({ value: ['angular'], disabled: true });
    return {
      props: { ...args, control },
      template: `
        <div style="width: 400px; padding: 20px;">
          <lib-multi-select [label]="label" [options]="options" [formControl]="control" />
        </div>
      `,
    };
  },
};
