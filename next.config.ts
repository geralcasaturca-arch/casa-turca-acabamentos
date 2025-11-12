// next.config.js (VERSÃO ESTÁVEL COM FUNÇÃO TRADICIONAL)

/** @type {import('next').NextConfig} */
const nextConfig = {
    // Não incluímos 'turbopack: {}' para evitar o conflito anterior.
    
    // Configuração para ignorar módulos Deno/Supabase no lado do servidor.
    webpack: function(config, { isServer }) {
        if (!isServer) {
            // Regra principal: Ignorar as Edge Functions
            config.externals = {
                ...config.externals,
                'https://deno.land/std': 'https://deno.land/std',
            };
        }
        return config;
    },
};

module.exports = nextConfig;