// /src/app/layout.tsx (CÓDIGO ATUALIZADO COM HEADER E FOOTER)

import './globals.css';
import Header from '@/components/Header'; // <-- NOVO IMPORT
import Footer from '@/components/Footer'; // <-- NOVO IMPORT
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


// Metadata e RootLayout
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
    <html lang="pt" className={`${playfair.variable} ${inter.variable} bg-turca-fundo`}> 
      <body className="flex min-h-screen flex-col">
        {/* CABEÇALHO DO SITE */}
        <Header /> 

        {/* CONTEÚDO PRINCIPAL (OCUPA ESPAÇO) */}
        <main className="flex-grow">
          {children}
        </main>

        {/* RODAPÉ DO SITE */}
        <Footer /> 
      </body>
    </html>
  );
}