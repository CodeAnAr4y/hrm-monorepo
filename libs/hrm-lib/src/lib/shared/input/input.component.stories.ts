import type { Meta, StoryObj } from '@storybook/angular';
import { InputComponent } from './input.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

const meta: Meta<InputComponent> = {
  title: 'UI/Input',
  component: InputComponent,

  parameters: {
    layout: 'centered',
  },

  decorators: [
    (story) => ({
      moduleMetadata: {
        imports: [ReactiveFormsModule],
      },
      ...story(),
    }),
  ],

  args: {
    type: 'text',
    placeholder: 'Enter value',
    label: 'Default Label',
  },

  argTypes: {
    type: {
      control: 'inline-radio',
      options: ['text', 'password', 'email', 'label'],
    },
    placeholder: {
      control: 'text',
    },
  },

  render: (args) => {
    const control = new FormControl('');

    return {
      props: {
        ...args,
        control,
      },
      template: `
        <div class="w-80">
          <lib-input
            [type]="type"
            [placeholder]="placeholder"
            [formControl]="control"
            [label]="label"
          />
        </div>
      `,
    };
  },
};

export default meta;

type Story = StoryObj<InputComponent>;

export const Default: Story = {};

export const Password: Story = {
  args: {
    type: 'password',
    placeholder: 'Password',
    label: 'Password',
  },
};

export const Email: Story = {
  args: {
    type: 'email',
    placeholder: 'Email',
    label: 'Email',
  },
};
