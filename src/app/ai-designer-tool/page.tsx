// /src/app/ai-designer-tool/page.tsx (USANDO O AUTH CHECKER)

'use client'; // ADICIONE ESTA LINHA PARA GARANTIR QUE FUNCIONA NO CLIENTE

import AuthChecker from '@/components/AuthChecker';
import AIDesignerTool from '@/components/AIDesignerTool';
import { supabase } from '@/utils/supabase/client';
import { useEffect, useState } from 'react';

// Novo componente para obter o usuário no cliente
function AuthenticatedApp() {
    const [user, setUser] = useState(null as any);

    useEffect(() => {
        const fetchUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);
        };
        fetchUser();
    }, []);

    // Apenas renderiza a ferramenta se o usuário for carregado.
    return (
        <div className="min-h-screen p-4 md:p-10">
            <h1 className="text-4xl font-extrabold font-serif text-amber-800 mb-6">
                ✨ Seu Designer Virtual: A Vantagem Turca AI
            </h1>
            <p className="text-gray-700 mb-8">
                Bem-vindo(a), **{user?.email || 'Cliente'}**! Faça o upload de uma foto do seu ambiente e escolha um estilo.
            </p>
            
            {/* O AuthChecker já garante que só chegamos aqui se houver um token. */}
            {user && <AIDesignerTool user={user} />}
        </div>
    );
}


export default function AIDesignerPage() {
    // Envolvemos tudo no AuthChecker
    return (
        <AuthChecker>
            <AuthenticatedApp />
        </AuthChecker>
    );
}
