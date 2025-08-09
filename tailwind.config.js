module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      // Extending the built-in 'dark' theme
      {
        dark: {
          "primary": "#4091c2",      // Custom primary color
          "secondary": "#165a7b",    // Custom secondary color
          "accent": "#37cdbe",       // Optional: custom accent color
          "neutral": "#3d4451",      // Optional: background or neutral color
          "base-100": "#2b2b2b",     // Custom base color for dark theme (background)
          "info": "#3abff8",         // Info color
          "success": "#36d399",      // Success color
          "warning": "#fbbd23",      // Warning color
          "error": "#f87272",        // Error color
        },
      },
    ],
  },
};
