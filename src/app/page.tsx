// /src/app/page.tsx (Recolocando o Formulário de Leads)

import LeadForm from '@/components/LeadForm';

// Esta é a nossa landing page principal.
export default function Home() {
  return (
    // Certifique-se de que a página tem espaço na vertical
    <main className="min-h-screen p-4 md:p-10">
      
      {/* Secção do Título da Marca */}
      <header className="text-center mb-12">
        <h1 className="text-5xl font-extrabold font-serif text-amber-800 tracking-wider">
          A Casa Turca Acabamentos
        </h1>
        <p className="text-xl text-gray-600 mt-2">
          Excelência Estética e Inovação na Gestão
        </p>
      </header>

      {/* Área Central: O Formulário de Qualificação */}
      <section>
        <LeadForm />
      </section>

      {/* Rodapé ou Informação Extra */}
      <footer className="mt-20 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} A Casa Turca. Todos os direitos reservados.</p>
      </footer>
    </main>
  );
}
