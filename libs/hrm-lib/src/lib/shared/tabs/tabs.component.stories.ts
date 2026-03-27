import type { Meta, StoryObj } from '@storybook/angular';
import { TabsComponent } from './tabs.component';
import { provideRouter } from '@angular/router';

const meta: Meta<TabsComponent> = {
  title: 'UI/Tabs',
  component: TabsComponent,

  parameters: {
    layout: 'centered',
  },

  decorators: [
    (story) => ({
      applicationConfig: {
        providers: [provideRouter([])],
      },
      ...story(),
    }),
  ],

  args: {
    tabs: [
      { title: 'Home', link: '/home' },
      { title: 'Profile', link: '/profile' },
      { title: 'Settings', link: '/settings' },
    ],
  },

  argTypes: {
    tabs: {
      control: 'object',
    },
  },

  render: (args) => ({
    props: args,
    template: `
      <div class="w-80">
        <lib-tabs [tabs]="tabs">
          <div class="mt-4 text-center text-sm text-gray-400">
            Tabs content
          </div>
        </lib-tabs>
      </div>
    `,
  }),
};

export default meta;

type Story = StoryObj<TabsComponent>;

export const Default: Story = {};

export const TwoTabs: Story = {
  args: {
    tabs: [
      { title: 'Login', link: '/login' },
      { title: 'Register', link: '/register' },
    ],
  },
};

export const LongTitles: Story = {
  args: {
    tabs: [
      { title: 'Very long tab name', link: '/one' },
      { title: 'Another long tab', link: '/two' },
    ],
  },
};
