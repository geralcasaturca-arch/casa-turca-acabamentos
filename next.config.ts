import type { NextConfig } from 'next';
import type { Configuration } from 'webpack';
import webpack from 'webpack';

const nextConfig: NextConfig = {
  experimental: {
    turbo: true, // ativa Turbopack
  },
  webpack: (config: Configuration, { isServer }) => {
    if (!isServer) {
      // Ignora importações Deno no bundle do cliente
      config.plugins = config.plugins || [];
      config.plugins.push(
        new webpack.IgnorePlugin({
          resourceRegExp: /^https:\/\/deno\.land\/std/,
        })
      );
    }

    return config;
  },
};

export default nextConfig;
