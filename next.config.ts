// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
    turbopack: {}, // Resolve conflito Turbopack
    webpack: (config, { isServer }) => {
        if (!isServer) {
            // Ignora módulos Deno para Next.js
            config.externals.push({
                'https://deno.land/std': 'https://deno.land/std',
            });
        }
        return config;
    },
};
module.exports = nextConfig;
