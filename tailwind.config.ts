// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // 💡 Paleta de Cores Turca de Luxo
      colors: {
        'turca-primaria': '#4E342E',   // Castanho Escuro (Taupe)
        'turca-fundo': '#F8F5F1',      // Creme Suave - Fundo Principal
        'turca-destaque': '#FFD700',   // Ouro Metálico - CTAs e Ícones
        'turca-secundaria': '#00A8A0', // Azul Turquesa - Links e Acentos
      },
      // 💡 Fontes: Serif para Luxo, Sans para Conteúdo
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'], // Luxo
        sans: ['Inter', 'Helvetica', 'Arial', 'sans-serif'],
      },
      // 💡 Box Shadow sutil para profundidade de luxo
      boxShadow: {
        luxo: '0 10px 30px rgba(0, 0, 0, 0.08)',
      },
    },
  },
  plugins: [],
};

export default config;
