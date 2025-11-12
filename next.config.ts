// next.config.js (SOLUÇÃO TURBOPACK/WEBPACK FINAL)

/** @type {import('next').NextConfig} */
const nextConfig = {
    // 1. ADICIONE ISTO: Silencia o erro do Vercel, dizendo "Eu sei que estou a usar o Webpack customizado."
    turbopack: {}, 
    
    // 2. Regra de webpack para ignorar módulos Deno/Supabase no lado do servidor.
    webpack: function(config, { isServer }) {
        if (!isServer) {
            // Regra principal: Ignorar as Edge Functions (resolve o erro 'deno.land/std')
            config.externals = {
                ...config.externals,
                'https://deno.land/std': 'https://deno.land/std',
            };
        }
        return config;
    },
};

module.exports = nextConfig;