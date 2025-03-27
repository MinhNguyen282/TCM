// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1F2937", // dark gray-blue
        secondary: "#2563EB", // blue
        accent: "#F59E0B", // amber for highlights
        background: "#F3F4F6", // light gray background
      },
    },
  },
  plugins: [],
};