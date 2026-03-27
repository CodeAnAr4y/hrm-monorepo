// const { createGlobPatternsForDependencies } = require('@nx/angular/tailwind');
// const { join } = require('path');
//
// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   darkMode: 'class',
//   content: [
//     join(__dirname, 'src/**/!(*.stories|*.spec).{ts,html}'),
//     ...createGlobPatternsForDependencies(__dirname)
//   ],
//   theme: {
//     extend: {
//       colors: {
//         primary: '#C62F31',
//         background: '#353535',
//         surface: '#2a2a2a',
//         border: '#646464',
//         secondary: '#767676',
//       }
//     }
//   },
//   plugins: []
// };


const preset = require('../../libs/design-system/tailwind-preset');

module.exports = {
  presets: [preset],
};
