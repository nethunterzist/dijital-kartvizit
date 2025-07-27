import { getBaseUrl, getApiUrl } from './lib/utils/getBaseUrl';

// Uygulama ortam değişkenleri

export const environment = {
  // Geliştirme ortamında true, canlı ortamda false olmalı
  isDevelopment: process.env.NODE_ENV !== 'production',
  
  // Otomatik doldur özelliği sadece geliştirme ortamında gösterilecek
  showAutoFillButton: process.env.NODE_ENV !== 'production',
  
  // API URL'leri - dinamik port algılama
  apiUrl: process.env.NEXT_PUBLIC_API_URL || '/api',
  baseUrl: getBaseUrl(),
  
  // Harici servis URL'leri
  cloudinary: {
    uploadUrl: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_URL || 'https://api.cloudinary.com/v1_1/dmjdeij1f/auto/upload',
    cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'dmjdeij1f',
    uploadPreset: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || 'pdf_unsigned'
  },
  
  // Database
  database: {
    url: process.env.DATABASE_URL,
    directUrl: process.env.DIRECT_URL
  },
  
  // Supabase
  supabase: {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL,
    anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY
  },
  
  // Auth
  auth: {
    secret: process.env.NEXTAUTH_SECRET,
    url: process.env.NEXTAUTH_URL
  }
};
