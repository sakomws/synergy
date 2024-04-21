/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Configure your color palette here
      },
      fontFamily: {
        inter: "var(--font-inter)",
      },
    },
  },
  plugins: [],
  // prefix: "tw-",
};
