'use client';

import Link from 'next/link';

export default function Header() {
  const navItems = [
    { name: 'Portfólio', href: '/portfolio' },
    { name: 'O Nosso Método', href: '/sobre' },
  ];

  return (
    <header className="sticky top-0 z-10 w-full bg-turca-primaria shadow-lg">
      <div className="container mx-auto flex items-center justify-between p-4">
        
        {/* Logo/Marca - Usando a fonte Serif para luxo */}
        <Link href="/" passHref legacyBehavior>
          <a className="text-2xl font-serif text-turca-destaque hover:text-white transition duration-200">
            A Casa Turca
          </a>
        </Link>

        {/* Navegação Principal */}
        <nav className="hidden space-x-6 md:flex">
          {navItems.map((item) => (
            <Link key={item.name} href={item.href} passHref legacyBehavior>
              <a className="text-lg font-sans text-white/80 hover:text-turca-destaque transition duration-200">
                {item.name}
              </a>
            </Link>
          ))}
        </nav>

        {/* CTA Principal: Contacto/Agendar */}
        <Link href="/contacto" passHref legacyBehavior>
          <a className="rounded-full bg-turca-destaque px-4 py-2 text-turca-primaria font-bold hover:bg-turca-secundaria hover:text-white transition duration-200 text-sm shadow-md">
            Agendar Consulta
          </a>
        </Link>
      </div>
    </header>
  );
}