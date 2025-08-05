// Utility for validating request data (title, datetime, etc.)
// You can use JOI, Zod, or custom validation logic here
// Example below uses custom validation for demonstration

/**
 * Validate that a string is not empty
 */
export function validateTitle(title) {
  return typeof title === 'string' && title.trim().length > 0;
}

/**
 * Validate ISO datetime string
 */
export function validateDatetime(datetime) {
  return !isNaN(Date.parse(datetime));
}

// Add more validators as needed
