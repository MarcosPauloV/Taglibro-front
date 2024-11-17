/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#4F46E5", // Azul principal (hover e gradientes)
          DEFAULT: "#3B82F6", // Azul principal
          dark: "#2563EB", // Azul escuro para botões
        },
        secondary: {
          light: "#D1FAE5", // Verde claro
          DEFAULT: "#10B981", // Verde para elementos de confirmação
          dark: "#047857", // Verde escuro
        },
        background: {
          light: "#F9FAFB", // Fundo claro
          DEFAULT: "#FFFFFF", // Fundo padrão
          dark: "#F3F4F6", // Fundo de seções
        },
        text: {
          light: "#6B7280", // Texto secundário
          DEFAULT: "#111827", // Texto principal
          dark: "#1F2937", // Texto de destaque
        },
      },
      fontFamily: {
        sans: ["Inter", "Roboto", "Arial", "sans-serif"],
      },
      spacing: {
        128: "32rem",
        144: "36rem",
      },
      boxShadow: {
        glow: "0 4px 15px rgba(59, 130, 246, 0.3)", // Azul brilhante
      },
    },
  },
  plugins: [],
};
