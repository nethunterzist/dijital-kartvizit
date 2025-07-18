import { ensureDatabaseIsReady } from './db';

export async function initializeDatabase() {
  try {
    const isReady = await ensureDatabaseIsReady();
    if (isReady) {
      console.log('Database initialized successfully');
    } else {
      console.error('Database initialization failed');
    }
    return isReady;
  } catch (error) {
    console.error('Database initialization error:', error);
    return false;
  }
}

// Export the function that was being imported
export { ensureDatabaseIsReady };
