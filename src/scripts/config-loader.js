import { API_ENDPOINTS } from './config-variables.js';

export async function loadConfiguration() {
  try {
    const response = await fetch(API_ENDPOINTS.CONFIG);
    if (!response.ok) {
      throw new Error('Failed to load configuration');
    }
    return await response.json();
  } catch (error) {
    console.error('Error loading configuration:', error);
    return {}; // Fallback to return an empty config or mock data
  }
}
