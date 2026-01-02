'use client';

import { useEffect, useState } from 'react';

interface FontAwesomeLoaderProps {
    children: React.ReactNode;
}

export default function FontAwesomeLoader({ children }: FontAwesomeLoaderProps) {
    const [fontLoaded, setFontLoaded] = useState(false);

    useEffect(() => {
        // Check if Font Awesome is already loaded
        if (document.fonts && document.fonts.check('400 16px "Font Awesome 6 Free"')) {
            setFontLoaded(true);
            return;
        }

        // Wait for Font Awesome to load
        const checkFontAwesome = () => {
            // Method 1: Check if Font Awesome CSS classes exist
            const testElement = document.createElement('i');
            testElement.className = 'fas fa-home';
            testElement.style.visibility = 'hidden';
            testElement.style.position = 'absolute';
            testElement.style.fontSize = '16px';
            document.body.appendChild(testElement);

            const computed = window.getComputedStyle(testElement);
            const fontFamily = computed.getPropertyValue('font-family');
            const content = computed.getPropertyValue('content');
            
            document.body.removeChild(testElement);

            // Check if Font Awesome is loaded using multiple indicators
            const isFontAwesome = fontFamily.includes('Font Awesome') || 
                                content !== 'none' && content !== '""' ||
                                computed.getPropertyValue('font-weight') === '900';

            if (isFontAwesome) {
                // Mark all icons as loaded
                const icons = document.querySelectorAll('i[class*="fa-"]');
                icons.forEach(icon => icon.classList.add('fa-loaded'));
                setFontLoaded(true);
            } else {
                // Retry after a short delay
                setTimeout(checkFontAwesome, 100);
            }
        };

        // Start checking after a short delay to allow CSS to load
        const timer = setTimeout(checkFontAwesome, 50);

        // Fallback: set loaded after 3 seconds regardless
        const fallbackTimer = setTimeout(() => {
            console.warn('Font Awesome loading timeout, proceeding anyway');
            setFontLoaded(true);
        }, 3000);

        return () => {
            clearTimeout(timer);
            clearTimeout(fallbackTimer);
        };
    }, []);

    // Show loading state with basic styling until Font Awesome loads
    if (!fontLoaded) {
        return (
            <div style={{ opacity: 0.8 }}>
                {children}
            </div>
        );
    }

    return <>{children}</>;
}