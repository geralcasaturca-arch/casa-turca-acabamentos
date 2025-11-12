import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-turca-primaria mt-16 py-12 text-white/80">
      <div className="container mx-auto px-4">
        
        {/* Layout de 3 Colunas */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          
          {/* Coluna 1: Marca e Missão */}
          <div>
            <h4 className="text-xl font-serif text-turca-destaque mb-3">A Casa Turca Acabamentos</h4>
            <p className="text-sm">
              Onde a arte encontra a eficiência. Soluções chave na mão para design de interiores de alto padrão em Luanda.
            </p>
          </div>

          {/* Coluna 2: Navegação Rápida */}
          <div>
            <h4 className="text-lg font-semibold mb-3 text-white">Navegação</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" passHref legacyBehavior><a className="hover:text-turca-destaque">Home</a></Link></li>
              <li><Link href="/portfolio" passHref legacyBehavior><a className="hover:text-turca-destaque">Portfólio</a></Link></li>
              <li><Link href="/sobre" passHref legacyBehavior><a className="hover:text-turca-destaque">O Nosso Método</a></Link></li>
              <li><Link href="/contacto" passHref legacyBehavior><a className="hover:text-turca-destaque">Contacto</a></Link></li>
            </ul>
          </div>

          {/* Coluna 3: Contacto e Legal */}
          <div>
            <h4 className="text-lg font-semibold mb-3 text-white">Contacto & Suporte</h4>
            <p className="text-sm mb-4">
              <span className="font-bold">E-mail:</span> info@casaturca.co <br />
              <span className="font-bold">Telefone:</span> +244 [Seu Número]
            </p>
            <ul className="space-y-2 text-xs">
              <li><Link href="/termos" passHref legacyBehavior><a className="hover:text-turca-destaque">Termos de Serviço</a></Link></li>
              <li><Link href="/privacidade" passHref legacyBehavior><a className="hover:text-turca-destaque">Política de Privacidade</a></Link></li>
            </ul>
          </div>

        </div>

        {/* Direitos Autorais */}
        <div className="mt-8 pt-6 border-t border-turca-secundaria/30 text-center text-xs">
          &copy; {new Date().getFullYear()} A Casa Turca Acabamentos. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}