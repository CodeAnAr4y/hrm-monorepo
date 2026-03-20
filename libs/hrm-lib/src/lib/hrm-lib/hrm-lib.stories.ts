import type { Meta, StoryObj } from '@storybook/angular';
import { HrmLib } from './hrm-lib';
import { expect } from 'storybook/test';

const meta: Meta<HrmLib> = {
  component: HrmLib,
  title: 'HrmLib',
};
export default meta;

type Story = StoryObj<HrmLib>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/hrm-lib/gi)).toBeTruthy();
  },
};
