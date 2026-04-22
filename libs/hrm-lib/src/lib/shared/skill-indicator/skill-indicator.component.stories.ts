import { type Meta, type StoryObj } from '@storybook/angular';
import { SkillIndicatorComponent } from '@hrm-monorepo/hrm-lib';

const meta: Meta<SkillIndicatorComponent> = {
  title: 'UI/SkillIndicator',
  component: SkillIndicatorComponent,
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark' },
  },
  argTypes: {
    mastery: {
      control: 'select',
      options: ['Novice', 'Advanced', 'Competent', 'Proficient', 'Expert'],
    },
  },
  args: {
    label: 'Angular',
    mastery: 'Competent',
  },
};

export default meta;

type Story = StoryObj<SkillIndicatorComponent>;

export const Default: Story = {};

export const Expert: Story = {
  args: {
    label: 'TypeScript',
    mastery: 'Expert',
  },
};

export const Novice: Story = {
  args: {
    label: 'GraphQL',
    mastery: 'Novice',
  },
};
