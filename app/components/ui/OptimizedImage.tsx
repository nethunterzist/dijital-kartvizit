'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { ImageOptimizationService } from '@/app/lib/services/ImageOptimizationService';
import { logger } from '@/app/lib/logger';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  variants?: Record<string, string>;
  quality?: number;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
  sizes?: string;
  fill?: boolean;
  style?: React.CSSProperties;
  onLoad?: () => void;
  onError?: () => void;
}

interface ImageState {
  isLoading: boolean;
  hasError: boolean;
  currentSrc: string;
  supportsWebP: boolean;
  supportsAVIF: boolean;
}

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  variants,
  quality = 85,
  placeholder = 'empty',
  blurDataURL,
  sizes,
  fill = false,
  style,
  onLoad,
  onError
}: OptimizedImageProps) {
  const [imageState, setImageState] = useState<ImageState>({
    isLoading: true,
    hasError: false,
    currentSrc: src,
    supportsWebP: false,
    supportsAVIF: false
  });

  // Check browser support for modern formats
  useEffect(() => {
    const checkFormatSupport = async () => {
      const supportsWebP = await checkWebPSupport();
      const supportsAVIF = await checkAVIFSupport();
      
      setImageState(prev => ({
        ...prev,
        supportsWebP,
        supportsAVIF
      }));
    };

    checkFormatSupport();
  }, []);

  // Update current source based on format support and variants
  useEffect(() => {
    if (!variants) return;

    let optimalSrc = src;

    // Prefer AVIF if supported and available
    if (imageState.supportsAVIF && variants.avif) {
      optimalSrc = variants.avif;
    }
    // Fall back to WebP if supported and available
    else if (imageState.supportsWebP && variants.webp) {
      optimalSrc = variants.webp;
    }
    // Use medium variant if available
    else if (variants.medium) {
      optimalSrc = variants.medium;
    }

    setImageState(prev => ({
      ...prev,
      currentSrc: optimalSrc
    }));
  }, [src, variants, imageState.supportsWebP, imageState.supportsAVIF]);

  const handleLoad = () => {
    setImageState(prev => ({
      ...prev,
      isLoading: false,
      hasError: false
    }));
    onLoad?.();
  };

  const handleError = () => {
    setImageState(prev => ({
      ...prev,
      isLoading: false,
      hasError: true,
      currentSrc: src // Fall back to original source
    }));
    onError?.();
  };

  // Generate responsive sizes if variants are available
  const responsiveSizes = sizes || (variants ? 
    '(max-width: 300px) 150px, (max-width: 600px) 300px, (max-width: 1200px) 600px, 1200px' 
    : undefined
  );

  // Generate srcSet from variants
  const srcSet = variants ? ImageOptimizationService.generateSrcSet(variants) : undefined;

  // Loading skeleton component
  const LoadingSkeleton = () => (
    <div 
      className={`animate-pulse bg-gray-200 ${className}`}
      style={{
        width: fill ? '100%' : width,
        height: fill ? '100%' : height,
        ...style
      }}
    />
  );

  // Error fallback component
  const ErrorFallback = () => (
    <div 
      className={`flex items-center justify-center bg-gray-100 text-gray-400 ${className}`}
      style={{
        width: fill ? '100%' : width,
        height: fill ? '100%' : height,
        ...style
      }}
    >
      <svg 
        className="w-8 h-8" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
        />
      </svg>
    </div>
  );

  // Show loading skeleton while image is loading
  if (imageState.isLoading && placeholder === 'empty') {
    return <LoadingSkeleton />;
  }

  // Show error fallback if image failed to load
  if (imageState.hasError) {
    return <ErrorFallback />;
  }

  return (
    <Image
      src={imageState.currentSrc}
      alt={alt}
      width={fill ? undefined : width}
      height={fill ? undefined : height}
      fill={fill}
      className={className}
      style={style}
      priority={priority}
      quality={quality}
      placeholder={placeholder}
      blurDataURL={blurDataURL}
      sizes={responsiveSizes}
      onLoad={handleLoad}
      onError={handleError}
    />
  );
}

// Utility functions for format support detection
async function checkWebPSupport(): Promise<boolean> {
  if (typeof window === 'undefined') return false;
  
  return new Promise((resolve) => {
    const webP = new window.Image();
    webP.onload = webP.onerror = () => {
      resolve(webP.height === 2);
    };
    webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
  });
}

async function checkAVIFSupport(): Promise<boolean> {
  if (typeof window === 'undefined') return false;
  
  return new Promise((resolve) => {
    const avif = new window.Image();
    avif.onload = avif.onerror = () => {
      resolve(avif.height === 2);
    };
    avif.src = 'data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgABogQEAwgMg8f8D///8WfhwB8+ErK42A=';
  });
}

// Hook for using optimized images with analysis
export function useImageOptimization() {
  const [analysis, setAnalysis] = useState<{
    recommendations: string[];
    estimatedSavings: number;
    optimalFormat: string;
  } | null>(null);

  const analyzeImage = async (file: File) => {
    try {
      const result = await ImageOptimizationService.analyzeImage(file);
      setAnalysis(result);
      return result;
    } catch (error) {
      logger.error('Image analysis failed', { error, fileName: file.name, fileSize: file.size });
      return null;
    }
  };

  const optimizeImage = async (file: File, options?: any) => {
    try {
      const result = await ImageOptimizationService.optimizeAndUpload(
        file, 
        'optimized_images', 
        options
      );
      return result;
    } catch (error) {
      logger.error('Image optimization failed', { error, fileName: file.name, fileSize: file.size, options });
      return null;
    }
  };

  return {
    analysis,
    analyzeImage,
    optimizeImage
  };
}

// Component for displaying optimization metadata
export function ImageOptimizationInfo({ 
  metadata 
}: { 
  metadata: {
    originalSize: number;
    optimizedSize: number;
    compressionRatio: number;
    format: string;
    dimensions: { width: number; height: number };
  }
}) {
  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-sm">
      <h4 className="font-semibold text-green-800 mb-2">🚀 Optimizasyon Başarılı!</h4>
      <div className="space-y-1 text-green-700">
        <div className="flex justify-between">
          <span>Orijinal Boyut:</span>
          <span className="font-mono">{formatBytes(metadata.originalSize)}</span>
        </div>
        <div className="flex justify-between">
          <span>Optimize Boyut:</span>
          <span className="font-mono">{formatBytes(metadata.optimizedSize)}</span>
        </div>
        <div className="flex justify-between">
          <span>Tasarruf:</span>
          <span className="font-semibold text-green-600">
            %{metadata.compressionRatio.toFixed(1)}
          </span>
        </div>
        <div className="flex justify-between">
          <span>Format:</span>
          <span className="font-mono uppercase">{metadata.format}</span>
        </div>
        <div className="flex justify-between">
          <span>Boyutlar:</span>
          <span className="font-mono">
            {metadata.dimensions.width} × {metadata.dimensions.height}
          </span>
        </div>
      </div>
    </div>
  );
}
