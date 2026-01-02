'use client';

import { useEffect, useRef } from 'react';

interface ViewTrackerProps {
  slug: string;
}

/**
 * ViewTracker Component
 *
 * Tracks page views by sending a POST request to the view count API endpoint.
 * Only tracks once per page load using useRef to prevent duplicate requests.
 *
 * @param slug - The company slug to track views for
 */
export default function ViewTracker({ slug }: ViewTrackerProps) {
  const hasTracked = useRef(false);

  useEffect(() => {
    // Only track once per page load
    if (hasTracked.current) return;

    const trackView = async () => {
      try {
        const response = await fetch(`/api/view/${slug}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log('View tracked:', data.goruntulenme);
          hasTracked.current = true;
        } else {
          console.error('Failed to track view:', response.status);
        }
      } catch (error) {
        console.error('Error tracking view:', error);
      }
    };

    // Track view after a small delay to ensure page is loaded
    const timer = setTimeout(trackView, 500);

    return () => clearTimeout(timer);
  }, [slug]);

  // This component doesn't render anything
  return null;
}
