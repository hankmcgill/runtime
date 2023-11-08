/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['src/**'],
  plugins: [require('daisyui')],
  daisyui: {
    // themes: ['corporate']
    themes: ['light', 'dark']
  }
}
