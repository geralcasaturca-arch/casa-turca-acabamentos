// next.config.js (SOLUÇÃO TURBOPACK/WEBPACK FINAL COM TIPAGEM)

/** @type {import('next').NextConfig} */
const nextConfig = {
    // 1. ADICIONE ISTO: Silencia o erro do Vercel, dizendo "Eu sei que estou a usar o Webpack customizado."
    turbopack: {}, 
    
    // 2. Regra de webpack para ignorar módulos Deno/Supabase no lado do servidor.
    // Tipamos o argumento 'config' para satisfazer o compilador do TypeScript.
    webpack: function(config, options) {
        /** @type {import('webpack').Configuration} */
        const typedConfig = config; // Tipa a configuração
        
        if (!options.isServer) {
            // Regra principal: Ignorar as Edge Functions (resolve o erro 'deno.land/std')
            typedConfig.externals = {
                ...typedConfig.externals,
                'https://deno.land/std': 'https://deno.land/std',
            };
        }
        return typedConfig;
    },
};

module.exports = nextConfig;