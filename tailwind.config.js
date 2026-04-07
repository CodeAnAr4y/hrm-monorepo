const { join } = require('path');

module.exports = {
  presets: [require('./libs/design-system/tailwind-preset')],
  content: [
    join(__dirname, 'apps/**/*.{ts,html,scss}'),
    join(__dirname, 'libs/**/*.{ts,html,scss}'),
  ],
};
