/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost', 'furkanyigit.com', 'res.cloudinary.com'],
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  // Performance optimizations
  swcMinify: true,
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['@heroicons/react', 'lucide-react', 'react-icons'],
    serverComponentsExternalPackages: ['bcrypt', 'prisma'],
    optimizeServerReact: true,
    ...(process.env.NODE_ENV === 'production' && {
      outputFileTracingRoot: process.cwd(),
    }),
  },
  
  // Production optimizations
  ...(process.env.NODE_ENV === 'production' && {
    // output: 'standalone', // DISABLED - causing static asset issues
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
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Standalone modu için output yapılandırması (development için kapatıldı)
  // output: 'standalone',
  
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
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=(), magnetometer=(), gyroscope=(), speaker=()'
          },
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://vercel.live https://api.vercel.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdnjs.cloudflare.com; font-src 'self' https://fonts.gstatic.com https://cdnjs.cloudflare.com; img-src 'self' data: https: blob:; connect-src 'self' https: wss:; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none';"
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
      }
    ]
  },
  
  // Webpack optimizations
  webpack: (config, { dev, isServer }) => {
    // Fix for handlebars webpack issue
    config.externals = config.externals || [];
    if (isServer) {
      config.externals.push('handlebars');
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
    
    // Advanced production optimizations
    if (!dev) {
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
    }
    
    // Bundle analyzer (uncomment to analyze bundle)
    // if (!dev && !isServer) {
    //   const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
    //   config.plugins.push(
    //     new BundleAnalyzerPlugin({
    //       analyzerMode: 'static',
    //       openAnalyzer: false,
    //     })
    //   );
    // }
    
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

module.exports = nextConfig;
