import type { Meta, StoryObj } from '@storybook/angular';
import { ButtonComponent } from './button.component';
import { ButtonVariant } from '@hrm-monorepo/hrm-lib';

const meta: Meta<ButtonComponent> = {
  title: 'UI/Button',
  component: ButtonComponent,

  parameters: {
    layout: 'centered',
  },
  args: {
    variant: ButtonVariant.CONTAINED,
    disabled: false,
  },

  argTypes: {
    variant: {
      control: 'inline-radio',
      options: [0,1,2],
    },
    disabled: {
      control: 'boolean',
    },
  },

  render: (args) => ({
    props: args,
    template: `
      <lib-button
        [variant]="variant"
        [disabled]="disabled"
      >
        Click Me
      </lib-button>
    `,
  }),
};

export default meta;

type Story = StoryObj<ButtonComponent>;

export const Default: Story = {};

export const Contained: Story = {
  args: {
    variant: ButtonVariant.CONTAINED,
  },
};

export const Outlined: Story = {
  args: {
    variant: ButtonVariant.OUTLINED,
  },
};

export const Text: Story = {
  args: {
    variant: ButtonVariant.TEXT,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};
