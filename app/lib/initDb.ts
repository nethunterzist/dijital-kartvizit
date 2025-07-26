import { ensureDatabaseIsReady } from './db';
import { logger } from './logger';

export async function initializeDatabase() {
  try {
    const isReady = await ensureDatabaseIsReady();
    if (isReady) {
      logger.info('Database initialized successfully');
    } else {
      logger.error('Database initialization failed');
    }
    return isReady;
  } catch (error) {
    logger.error('Database initialization error', { error });
    return false;
  }
}

// Export the function that was being imported
export { ensureDatabaseIsReady };
