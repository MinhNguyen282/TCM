// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0B72D7", // dark gray-blue
        secondary: "#89AFD3", // blue
        accent: "#F59E0B", // amber for highlights
        background: "#F3F4F6", // light gray background
      },
    },
  },
  plugins: [],
};