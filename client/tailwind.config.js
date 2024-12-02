/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#c5aa82",
        secondary: "#1c395e",
        accent: "#10B981",
        background: "#1c395e",
        primaryActive: "#EF4444",
        primaryDesactive: "#d5cfc5",
        secondaryActive: "#1c395e",
        secondatyDesactive: "#a6aacc",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"], // Usa Inter como fuente predeterminada sans-serif
        inter: ["Inter", "sans-serif"], // Alias para Inter
      },
      screens: {
        mobile: "640px", // Tamaño máximo para móvil
        tablet: "768px", // Tamaño máximo para tablet
        desktop: "1024px", // Tamaño para escritorio y superior
      },
    },
    plugins: [],
  },
};
