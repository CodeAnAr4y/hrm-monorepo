import type { Meta, StoryObj } from '@storybook/angular';
import { Tab } from './tab';
import { expect } from 'storybook/test';

const meta: Meta<Tab> = {
  component: Tab,
  title: 'Tab',
};
export default meta;

type Story = StoryObj<Tab>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/tab/gi)).toBeTruthy();
  },
};
