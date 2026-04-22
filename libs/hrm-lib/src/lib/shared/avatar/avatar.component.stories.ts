import { applicationConfig, type Meta, type StoryObj } from '@storybook/angular';
import { AvatarComponent } from './avatar.component';
import { importProvidersFrom, provideAppInitializer, inject } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

const meta: Meta<AvatarComponent> = {
  title: 'UI/Avatar',
  component: AvatarComponent,
  decorators: [
    applicationConfig({
      providers: [
        importProvidersFrom(TranslateModule.forRoot()),
        provideAppInitializer(() => {
          const translate = inject(TranslateService);
          translate.use('en');
          translate.setTranslation('en', {
            'user': {
              'profile': {
                'avatar': {
                  'upload': 'Upload Photo',
                  'hint': 'Allowed JPG, GIF or PNG. Max size of 800kB'
                }
              }
            }
          });
        }),
      ],
    }),
  ],
  args: {
    name: 'Ivan Ivanov',
    email: 'ivan@company.com',
    size: 120,
    isEditable: false,
    src: '',
  },
  argTypes: {
    size: { control: { type: 'range', min: 40, max: 300, step: 10 } },
    src: { control: 'text' },
  }
};

export default meta;

type Story = StoryObj<AvatarComponent>;

export const Default: Story = {};

export const WithImage: Story = {
  args: {
    src: 'https://images.pexels.com/photos/34042367/pexels-photo-34042367.png',
    name: 'Jane Smith',
  },
};

export const Editable: Story = {
  args: {
    isEditable: true,
    metadata: 'Administrator',
  },
};

export const Small: Story = {
  args: {
    size: 64,
    name: 'Small Avatar',
  },
};
