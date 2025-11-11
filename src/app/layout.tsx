// /src/app/layout.tsx (CÓDIGO ATUALIZADO COM NOVAS FONTES)

import './globals.css';
// Importação de fonte de luxo (Serif) do Google Fonts
import { Playfair_Display, Inter } from 'next/font/google'; 

// Inicialização da fonte (para que o Tailwind a possa usar)
const playfair = Playfair_Display({ 
  subsets: ['latin'], 
  variable: '--font-serif', // O nome que usaremos no Tailwind
  display: 'swap',
});

const inter = Inter({ 
  subsets: ['latin'], 
  variable: '--font-sans', 
  display: 'swap',
});


// Metadata e RootLayout (use a cor primária para o fundo)
export const metadata = {
  title: 'A Casa Turca Acabamentos | Luxo & Gestão Ágil',
  description: 'Gestão de projetos de design de interiores e acabamentos de alto padrão em Luanda, Angola. Onde a arte encontra a eficiência.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // Aplicamos as classes de fonte e fundo ao corpo principal
    <html lang="pt" className={`${playfair.variable} ${inter.variable} bg-turca-fundo`}> 
      <body>{children}</body>
    </html>
  );
}
