// next.config.js (SOLUÇÃO TURBOPACK/WEBPACK FINAL COM TIPAGEM)

/** @type {import('next').NextConfig} */
const nextConfig = {
    // 1. ADICIONE ISTO: Silencia o erro do Vercel, dizendo "Eu sei que estou a usar o Webpack customizado."
    turbopack: {}, 
    
    // 2. Regra de webpack para ignorar módulos Deno/Supabase no lado do servidor.
    // Usamos a sintaxe de função arrow com um JSDoc detalhado para forçar a tipagem.
    /** * @param {import('webpack').Configuration} config
     * @param {{isServer: boolean, dev: boolean, dir: string, config: nextConfig}} options
     */
    webpack: (config, options) => {
        if (!options.isServer) {
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