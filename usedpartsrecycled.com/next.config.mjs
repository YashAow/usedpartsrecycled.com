// next.config.mjs

let userConfig = {};

try {
  const imported = await import('./v0-user-next.config.mjs').then((mod) => mod.default || mod);
  userConfig = imported;
} catch (e) {
  // No user config found
}

/** @type {import('next').NextConfig} */
const baseConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    unoptimized: true,
    minimumCacheTTL: 31536000,
  },
  experimental: {
    webpackBuildWorker: true,
    parallelServerBuildTraces: true,
    parallelServerCompiles: true,
  },
};

function mergeConfig(base, user) {
  const result = { ...base };
  for (const key in user) {
    if (
      typeof base[key] === 'object' &&
      !Array.isArray(base[key]) &&
      typeof user[key] === 'object'
    ) {
      result[key] = { ...base[key], ...user[key] };
    } else {
      result[key] = user[key];
    }
  }
  return result;
}

const finalConfig = mergeConfig(baseConfig, userConfig);

export default finalConfig;
