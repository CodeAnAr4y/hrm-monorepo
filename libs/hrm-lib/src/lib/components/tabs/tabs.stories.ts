import type { Meta, StoryObj } from '@storybook/angular';
import { Tabs } from './tabs';
import { expect } from 'storybook/test';

const meta: Meta<Tabs> = {
  component: Tabs,
  title: 'Tabs',
};
export default meta;

type Story = StoryObj<Tabs>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/tabs/gi)).toBeTruthy();
  },
};
