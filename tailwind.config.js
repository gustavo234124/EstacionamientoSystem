/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}", // por si agregas app router en algún momento
  ],
  theme: {
    extend: {
      colors: {
        glassWhite: "rgba(255, 255, 255, 0.3)", // para glassmorphism
      },
      borderRadius: {
        "4xl": "2rem",
      },
      backdropBlur: {
        xs: "2px",
        sm: "4px",
        DEFAULT: "10px",
        lg: "20px",
      },
    },
  },
  plugins: [],
};
