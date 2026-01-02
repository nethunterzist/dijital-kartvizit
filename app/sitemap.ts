import { MetadataRoute } from 'next';

/**
 * Dynamic Sitemap Generator for Dijital Kartvizit
 *
 * Generates XML sitemap with:
 * - Homepage
 * - All active firma pages
 * - Update frequency hints
 * - Priority scoring
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';

  try {
    // Import database function
    const { getAllFirmalar } = await import('@/app/lib/direct-db');

    // Get all firmalar (limit: 10000 for sitemap)
    const result = await getAllFirmalar('', 1, 10000);
    const firmalar = result.data;

    // Base sitemap entries
    const routes: MetadataRoute.Sitemap = [
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 1,
      },
    ];

    // Add all firma pages
    if (firmalar && firmalar.length > 0) {
      firmalar.forEach((firma: any) => {
        routes.push({
          url: `${baseUrl}/${firma.slug}`,
          lastModified: new Date(firma.updated_at || firma.created_at),
          changeFrequency: 'weekly',
          priority: 0.8,
        });
      });
    }

    return routes;
  } catch (error) {
    console.error('Error generating sitemap:', error);

    // Return minimal sitemap on error
    return [
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 1,
      },
    ];
  }
}
