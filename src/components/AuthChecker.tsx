// /src/components/AuthChecker.tsx

'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';

export default function AuthChecker({ children }: { children: React.ReactNode }) {
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        // Esta função lê a sessão do Supabase logo que a página carrega.
        const checkUser = async () => {
            const { data: { session } } = await supabase.auth.getSession();

            if (!session) {
                // Se não houver sessão, redireciona para a página inicial
                router.replace('/'); 
            } else {
                setLoading(false); // Se houver sessão, para de carregar e mostra o conteúdo
            }
        };

        checkUser();

        // Subscrição para ouvir alterações no estado de autenticação (login/logout)
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            if (session) {
                setLoading(false);
            } else {
                router.replace('/');
            }
        });

        return () => {
            subscription.unsubscribe();
        };
    }, [router]);

    if (loading) {
        // Mostrar um ecrã de carregamento enquanto verifica a sessão
        return (
            <div className="flex justify-center items-center h-screen text-xl text-amber-800">
                A verificar chave de acesso...
            </div>
        );
    }

    return <>{children}</>; // Mostra o conteúdo da ferramenta se o login for válido
}