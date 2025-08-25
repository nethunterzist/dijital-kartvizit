import dynamic from 'next/dynamic';
import { LoadingSpinner } from './ui/Skeleton';

// Admin panel için dynamic imports
export const DynamicAdminLayout = dynamic(
  () => import('@/app/admin/layout'),
  {
    loading: () => (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size="lg" />
          <p className="mt-4 text-gray-600 dark:text-gray-400">Admin panel yükleniyor...</p>
        </div>
      </div>
    ),
    ssr: false
  }
);

// Firma yönetimi için dynamic imports
export const DynamicFirmalarPage = dynamic(
  () => import('@/app/admin/firmalar/page'),
  {
    loading: () => (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
          <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
      </div>
    ),
    ssr: false
  }
);

export const DynamicFirmaForm = dynamic(
  () => import('@/app/admin/firmalar/yeni/page'),
  {
    loading: () => (
      <div className="p-6">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
          <div className="space-y-4">
            <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
        </div>
      </div>
    ),
    ssr: false
  }
);

// Template yönetimi için dynamic imports
export const DynamicTemalarPage = dynamic(
  () => import('@/app/admin/temalar/page'),
  {
    loading: () => (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="flex gap-8">
            <div className="w-80 space-y-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="h-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
              ))}
            </div>
            <div className="flex-1">
              <div className="h-96 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    ),
    ssr: false
  }
);

// Dashboard için dynamic imports
export const DynamicDashboard = dynamic(
  () => import('@/app/admin/dashboard/page'),
  {
    loading: () => (
      <div className="p-6">
        <div className="animate-pulse space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
            ))}
          </div>
          <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
      </div>
    ),
    ssr: false
  }
);

// Ayarlar için dynamic imports
export const DynamicAyarlarPage = dynamic(
  () => import('@/app/admin/ayarlar/page'),
  {
    loading: () => (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
          <div className="space-y-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    ),
    ssr: false
  }
);

// Mevcut component'ler için dynamic imports
export const DynamicFirmaSayfasi = dynamic(
  () => import('@/app/components/FirmaSayfasi'),
  {
    loading: () => (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size="lg" />
          <p className="mt-4 text-gray-600 dark:text-gray-400">Firma sayfası yükleniyor...</p>
        </div>
      </div>
    ),
    ssr: true // Firma sayfası SEO için SSR gerekli
  }
);

export const DynamicHeroCarousel = dynamic(
  () => import('@/app/components/HeroCarousel'),
  {
    loading: () => (
      <div className="h-96 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
    ),
    ssr: false
  }
);

export const DynamicFeedbackCarousel = dynamic(
  () => import('@/app/components/FeedbackCarousel'),
  {
    loading: () => (
      <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
    ),
    ssr: false
  }
);

export const DynamicVideoFeatureSection = dynamic(
  () => import('@/app/components/VideoFeatureSection'),
  {
    loading: () => (
      <div className="h-96 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
    ),
    ssr: false
  }
);

export const DynamicTabbedFeatures = dynamic(
  () => import('@/app/components/TabbedFeatures'),
  {
    loading: () => (
      <div className="h-80 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
    ),
    ssr: false
  }
);

export const DynamicSmartFaq = dynamic(
  () => import('@/app/components/SmartFaq'),
  {
    loading: () => (
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
        ))}
      </div>
    ),
    ssr: false
  }
);

// Template selector için dynamic import
export const DynamicTemplateSelector = dynamic(
  () => import('@/app/components/TemplateSelector'),
  {
    loading: () => (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="h-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
        ))}
      </div>
    ),
    ssr: false
  }
);

// Phone preview için dynamic import
export const DynamicPhonePreview = dynamic(
  () => import('@/app/components/PhonePreview'),
  {
    loading: () => (
      <div className="w-80 h-[600px] bg-gray-200 dark:bg-gray-700 rounded-[2.5rem] animate-pulse"></div>
    ),
    ssr: false
  }
);

// Export all for easy importing
export {
  LoadingSpinner
};
