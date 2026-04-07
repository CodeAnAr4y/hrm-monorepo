const { createGlobPatternsForDependencies } = require('@nx/angular/tailwind');
const { join } = require('path');

module.exports = {
  darkMode: 'class',

  content: [
    join(__dirname, '../../apps/**/*.{ts,html,scss,css}'),
    join(__dirname, '../../libs/**/*.{ts,html,scss,css}'),
    join(__dirname, '../../.storybook/**/*.{ts,html,scss,css}'),
  ],

  theme: {
    extend: {
      colors: {
        primary: '#C62F31',
        background: '#353535',
        surface: '#2a2a2a',
        border: '#646464',
        textPrimary: '#ffffff',
        textSecondary: '#767676',
      },
    },
  },

  plugins: [],
};
