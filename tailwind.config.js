// Tailwind CSS v4 Configuration
// Note: v4 uses minimal config, most customization is done via CSS @theme directive
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./layout/**/*.liquid",
    "./templates/**/*.liquid", 
    "./sections/**/*.liquid",
    "./snippets/**/*.liquid",
    "./styles/css/**/*.css"
  ],
}
