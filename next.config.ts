// next.config.js — compatível com Vercel e Turbopack

const webpack = require('webpack');

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    turbo: true, // ativa Turbopack (opcional)
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Ignora qualquer import remoto Deno no bundle do cliente
      config.plugins.push(
        new webpack.IgnorePlugin({
          resourceRegExp: /^https:\/\/deno\.land\/std/,
        })
      );
    }
    return config;
  },
};

module.exports = nextConfig;
