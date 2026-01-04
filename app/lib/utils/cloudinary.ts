/**
 * Cloudinary utility functions for URL transformation
 */

/**
 * Transforms a Cloudinary URL to include the attachment flag for PDFs
 * This forces the browser to download the file instead of trying to display it
 *
 * @param url - The Cloudinary URL to transform
 * @returns The transformed URL with fl_attachment flag
 *
 * @example
 * // Before: https://res.cloudinary.com/cloud/raw/upload/v123/file.pdf
 * // After:  https://res.cloudinary.com/cloud/raw/upload/fl_attachment/v123/file.pdf
 */
export function addCloudinaryAttachmentFlag(url: string | null | undefined): string | null {
  if (!url) return null;

  // Only transform Cloudinary URLs
  if (!url.includes('res.cloudinary.com')) {
    return url;
  }

  // Already has the attachment flag
  if (url.includes('/fl_attachment/')) {
    return url;
  }

  // Add fl_attachment transformation after /upload/
  return url.replace('/upload/', '/upload/fl_attachment/');
}

/**
 * Transforms a Cloudinary URL to include the attachment flag and optionally set a custom filename
 *
 * @param url - The Cloudinary URL to transform
 * @param filename - Optional custom filename for the download
 * @returns The transformed URL
 *
 * @example
 * // With custom filename:
 * addCloudinaryDownload(url, 'my-catalog.pdf')
 * // Result: https://res.cloudinary.com/cloud/raw/upload/fl_attachment:my-catalog.pdf/v123/file.pdf
 */
export function addCloudinaryDownload(url: string | null | undefined, filename?: string): string | null {
  if (!url) return null;

  // Only transform Cloudinary URLs
  if (!url.includes('res.cloudinary.com')) {
    return url;
  }

  // Already has an attachment flag
  if (url.includes('/fl_attachment')) {
    return url;
  }

  const flag = filename ? `fl_attachment:${filename}` : 'fl_attachment';
  return url.replace('/upload/', `/upload/${flag}/`);
}
