/** @type {import('next').NextConfig} */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

// Polyfill removed - not needed with proper webpack configuration

const nextConfig = {
  images: {
    domains: ['localhost', 'res.cloudinary.com'],
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Performance optimizations
  swcMinify: true,
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['@heroicons/react', 'lucide-react', 'react-icons'],
    serverComponentsExternalPackages: ['bcrypt', 'prisma', '@hello-pangea/dnd', '@dnd-kit/core', '@dnd-kit/sortable', 'cheerio', 'isomorphic-dompurify', 'dompurify'],
    optimizeServerReact: true,
    ...(process.env.NODE_ENV === 'production' && {
      outputFileTracingRoot: process.cwd(),
    }),
  },

  // Production optimizations
  ...(process.env.NODE_ENV === 'production' && {
    // output: 'standalone', // DISABLED - Not needed for Coolify deployment
    poweredByHeader: false,
    generateEtags: true,

    // Static file serving configuration
    trailingSlash: false,

    // Advanced optimizations for production
    compiler: {
      removeConsole: {
        exclude: ['error', 'warn'],
      },
      reactRemoveProperties: true,
    },
  }),

  // TypeScript configuration
  typescript: {
    ignoreBuildErrors: false, // Enable type checking for production safety
  },

  // ESLint configuration
  eslint: {
    // Temporarily ignore during builds to allow deployment with warnings
    // TODO: Fix all ESLint warnings and re-enable strict linting
    ignoreDuringBuilds: true,
    dirs: ['app', 'pages', 'components', 'lib'], // Specify directories to lint
  },

  // Compression
  compress: true,

  // Security and performance headers
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=(), magnetometer=(), gyroscope=(), speaker=()'
          },
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://vercel.live https://api.vercel.com https://cdnjs.cloudflare.com https://kit.fontawesome.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdnjs.cloudflare.com; font-src 'self' https://fonts.gstatic.com https://cdnjs.cloudflare.com https://ka-f.fontawesome.com; img-src 'self' data: https: blob:; media-src 'self' https://*.b-cdn.net; connect-src 'self' https: wss:; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none';"
          },
          {
            key: 'X-Powered-By',
            value: ''
          }
        ],
      },
      {
        source: '/:path*.vcf',
        headers: [
          {
            key: 'Content-Type',
            value: 'text/vcard',
          },
          {
            key: 'Content-Disposition',
            value: 'attachment',
          }
        ],
      },
      // Cache static assets
      {
        source: '/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ]
      },
      // Cache images
      {
        source: '/:path*.(jpg|jpeg|png|gif|ico|svg|webp)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, stale-while-revalidate=604800'
          }
        ]
      },
      // PDF files - proper MIME type and inline display
      {
        source: '/uploads/firma_kataloglari/:path*.pdf',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/pdf'
          },
          {
            key: 'Content-Disposition',
            value: 'inline'
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, stale-while-revalidate=86400'
          }
        ]
      }
    ]
  },

  // Redirects for SEO
  async redirects() {
    return [
      {
        source: '/:slug/qr',
        destination: '/api/qr-codes/:slug',
        permanent: true,
      },
      {
        source: '/qr/:slug',
        destination: '/api/qr-codes/:slug',
        permanent: true,
      }
    ]
  },

  // Webpack optimizations
  webpack: (config, { dev, isServer }) => {
    // Fix for handlebars and cheerio webpack issue
    config.externals = config.externals || [];
    if (isServer) {
      config.externals.push('handlebars', 'cheerio', 'jsdom');
    }

    // Fix for 'self is not defined' error
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }

    // Advanced production optimizations - DISABLED to fix build issues
    // TODO: Re-enable after resolving webpack runtime errors
    /* if (!dev) {
      config.optimization.splitChunks = {
        chunks: 'all',
        minSize: 20000,
        maxSize: 200000,
        cacheGroups: {
          // React vendor chunk (separate for better caching)
          react: {
            test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
            name: 'react-vendor',
            chunks: 'all',
            priority: 10,
          },
          // UI libraries chunk
          ui: {
            test: /[\\/]node_modules[\\/](@headlessui|@heroicons|lucide-react|@dnd-kit)[\\/]/,
            name: 'ui-vendor',
            chunks: 'all',
            priority: 9,
          },
          // Database/API libraries
          api: {
            test: /[\\/]node_modules[\\/](@prisma|@tanstack|swr)[\\/]/,
            name: 'api-vendor',
            chunks: 'all',
            priority: 8,
          },
          // Utilities and smaller libraries
          utils: {
            test: /[\\/]node_modules[\\/](clsx|tailwind-merge|zod)[\\/]/,
            name: 'utils-vendor',
            chunks: 'all',
            priority: 7,
          },
          // Default vendor chunk for remaining node_modules
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
            priority: 5,
          },
        },
      };
    } */

    return config;
  },

  // Environment variables
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },

  // Logging
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
};

module.exports = withBundleAnalyzer(nextConfig);
