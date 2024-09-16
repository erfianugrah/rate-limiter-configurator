import { API_ENDPOINTS } from './config-variables';

export async function loadConfiguration() {
  const response = await fetch(API_ENDPOINTS.CONFIG);
  if (!response.ok) {
    throw new Error('Failed to load configuration');
  }
  return response.json();
}
