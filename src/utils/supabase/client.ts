// /src/utils/supabase/client.ts

import { createClient } from '@supabase/supabase-js';

// As variáveis são lidas do .env.local
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Verificação de segurança
if (!supabaseUrl || !supabaseAnonKey) {
  // Apenas uma mensagem de erro no console, não deve travar o site em produção
  console.error('As variáveis de ambiente do Supabase não estão definidas. Verifique o .env.local.');
}

// Criação do cliente Supabase
// Se as chaves estiverem faltando, passamos strings vazias para não quebrar o código.
export const supabase = createClient(supabaseUrl || '', supabaseAnonKey || '');
