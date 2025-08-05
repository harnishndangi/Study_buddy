// Simple logger utility for errors and system info

/**
 * Log info messages
 */
export function logInfo(message) {
  console.log(`[INFO] ${new Date().toISOString()} - ${message}`);
}

/**
 * Log error messages
 */
export function logError(error) {
  console.error(`[ERROR] ${new Date().toISOString()} -`, error);
}
