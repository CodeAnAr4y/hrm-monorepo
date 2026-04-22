import { applicationConfig, moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { TextAreaComponent } from './text-area.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

const meta: Meta<TextAreaComponent> = {
  title: 'UI/TextArea',
  component: TextAreaComponent,
  decorators: [
    moduleMetadata({
      imports: [ReactiveFormsModule],
    }),
  ],
  args: {
    label: 'Комментарий',
    placeholder: 'Введите текст здесь...',
  },
};

export default meta;

type Story = StoryObj<TextAreaComponent>;

export const Default: Story = {
  render: (args) => {
    const control = new FormControl('');

    return {
      props: {
        ...args,
        control,
      },
      template: `
        <div style="width: 400px; padding: 20px;">
          <lib-text-area
            [label]="label"
            [placeholder]="placeholder"
            [formControl]="control"
          />
          <div style="margin-top: 10px; font-size: 12px; color: gray;">
            Значение в контроле: {{ control.value }}
          </div>
        </div>
      `,
    };
  },
};

export const WithValue: Story = {
  render: (args) => {
    const control = new FormControl('Это начальное длинное значение, которое должно протестировать автоматическое изменение высоты нашего текстового поля.');

    return {
      props: { ...args, control },
      template: `
        <div style="width: 400px; padding: 20px;">
          <lib-text-area [label]="label" [formControl]="control" />
        </div>
      `,
    };
  },
};

export const Disabled: Story = {
  render: (args) => {
    const control = new FormControl({ value: 'Текст нельзя редактировать', disabled: true });
    return {
      props: { ...args, control },
      template: `
        <div style="width: 400px; padding: 20px;">
          <lib-text-area [label]="label" [formControl]="control" />
        </div>
      `,
    };
  },
};
