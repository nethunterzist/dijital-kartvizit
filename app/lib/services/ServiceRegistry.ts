// Service Registry - Lazy Loading Pattern for Performance
// This prevents massive bundle bloat in API routes

import { logger } from '@/app/lib/logger';

class ServiceRegistry {
  private static instance: ServiceRegistry;
  private services: Map<string, any> = new Map();

  static getInstance(): ServiceRegistry {
    if (!ServiceRegistry.instance) {
      ServiceRegistry.instance = new ServiceRegistry();
    }
    return ServiceRegistry.instance;
  }

  // Lazy load services only when needed
  async getService<T>(serviceName: string, loader: () => Promise<T>): Promise<T> {
    if (!this.services.has(serviceName)) {
      try {
        const service = await loader();
        this.services.set(serviceName, service);
        return service;
      } catch (error) {
        logger.error(`Failed to load service ${serviceName}:`, error);
        throw error;
      }
    }
    return this.services.get(serviceName);
  }

  // Preload critical services (optional)
  async preloadCriticalServices() {
    const criticalServices: Array<{ name: string; loader: () => Promise<any> }> = [
      { name: 'AuthService', loader: () => import('./AuthService').then(m => m.AuthService) },
      { name: 'FirmaService', loader: () => import('./FirmaService').then(m => m.FirmaService) }
    ];

    await Promise.all(
      criticalServices.map(({ name, loader }) => this.getService(name, loader))
    );
  }

  // Clear services (for testing or memory management)
  clearServices() {
    this.services.clear();
  }
}

// Service loader functions with lazy imports
export const ServiceLoaders = {
  authService: () => import('./AuthService').then(m => new m.AuthService()),
  formDataParser: () => import('./FormDataParser').then(m => new m.FormDataParser()),
  fileUploadService: () => import('./LocalFileUploadService').then(m => new m.LocalFileUploadService()),
  firmaService: () => import('./FirmaService').then(m => new m.FirmaService()),
  postProcessingService: () => import('./PostProcessingService').then(m => new m.PostProcessingService()),
  cacheInvalidationService: () => import('./CacheInvalidationService').then(m => new m.CacheInvalidationService()),
};

// Convenience functions for common service access patterns
export const getAuthService = () => ServiceRegistry.getInstance().getService('AuthService', ServiceLoaders.authService);
export const getFormDataParser = () => ServiceRegistry.getInstance().getService('FormDataParser', ServiceLoaders.formDataParser);
export const getFileUploadService = () => ServiceRegistry.getInstance().getService('FileUploadService', ServiceLoaders.fileUploadService);
export const getFirmaService = () => ServiceRegistry.getInstance().getService('FirmaService', ServiceLoaders.firmaService);
export const getPostProcessingService = () => ServiceRegistry.getInstance().getService('PostProcessingService', ServiceLoaders.postProcessingService);

// Cache services - use basic CacheInvalidationService for all cache operations
export const getCacheInvalidationService = () => ServiceRegistry.getInstance().getService('CacheInvalidationService', ServiceLoaders.cacheInvalidationService);
export const getSmartCacheInvalidationService = () => ServiceRegistry.getInstance().getService('CacheInvalidationService', ServiceLoaders.cacheInvalidationService);
export const getUltraSmartCacheInvalidationService = () => ServiceRegistry.getInstance().getService('CacheInvalidationService', ServiceLoaders.cacheInvalidationService);
export const getQuantumCacheInvalidationService = () => ServiceRegistry.getInstance().getService('CacheInvalidationService', ServiceLoaders.cacheInvalidationService);
export const getAdvancedCUDService = () => ServiceRegistry.getInstance().getService('FirmaService', ServiceLoaders.firmaService);

export default ServiceRegistry;