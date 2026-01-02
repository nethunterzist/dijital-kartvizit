import type { Metadata } from "next";
import "./globals.css";
import AuthProvider from "./components/AuthProvider";
import ErrorBoundary from "./components/ErrorBoundary";
import './lib/initDb';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXTAUTH_URL || 'http://localhost:3000'),
  title: {
    default: 'Dijital Kartvizit - Modern ve Profesyonel Kartvizit Platformu',
    template: '%s | Dijital Kartvizit'
  },
  description: 'QR kodlu dijital kartvizit oluşturun. Sosyal medya, iletişim bilgileri ve banka hesaplarınızı tek bir kartvizitte toplayın. Modern, profesyonel ve kullanımı kolay dijital kartvizit platformu.',
  keywords: [
    'dijital kartvizit',
    'QR kod kartvizit',
    'online kartvizit',
    'e-kartvizit',
    'sanal kartvizit',
    'dijital kartvizit oluştur',
    'QR kod',
    'kartvizit sistemi',
    'profesyonel kartvizit',
    'iş kartviziti'
  ],
  authors: [{ name: 'Dijital Kartvizit' }],
  creator: 'Dijital Kartvizit',
  publisher: 'Dijital Kartvizit',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    url: process.env.NEXTAUTH_URL,
    siteName: 'Dijital Kartvizit',
    title: 'Dijital Kartvizit - Modern ve Profesyonel Kartvizit Platformu',
    description: 'QR kodlu dijital kartvizit oluşturun. Sosyal medya, iletişim bilgileri ve banka hesaplarınızı tek bir kartvizitte toplayın.',
    images: [{
      url: '/images/og-image.png',
      width: 1200,
      height: 630,
      alt: 'Dijital Kartvizit Platform',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dijital Kartvizit - Modern ve Profesyonel Kartvizit Platformu',
    description: 'QR kodlu dijital kartvizit oluşturun. Modern ve profesyonel dijital kartvizit platformu.',
    images: ['/images/twitter-image.png'],
    creator: '@dijitalkartvizit',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'google-site-verification-code-here',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Dijital Kartvizit Sistemi" />
      </head>
      <body>
        <ErrorBoundary>
          <AuthProvider>{children}</AuthProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
