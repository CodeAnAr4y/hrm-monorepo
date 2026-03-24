import type { Meta, StoryObj } from '@storybook/angular';
import { Input } from './input';
import { expect } from 'storybook/test';

const meta: Meta<Input> = {
  component: Input,
  title: 'Input',
};
export default meta;

type Story = StoryObj<Input>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/input/gi)).toBeTruthy();
  },
};
