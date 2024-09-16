import { API_ENDPOINTS, MESSAGES } from './config-variables';

export async function saveConfiguration() {
  try {
    // Update rule orders based on their current positions
    window.currentRules.forEach((rule, index) => {
      rule.order = index + 1;
    });

    const response = await fetch(API_ENDPOINTS.CONFIG, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ rules: window.currentRules }),
    });

    if (!response.ok) {
      throw new Error('Failed to save configuration');
    }

    document.getElementById('message').textContent = MESSAGES.CONFIG_SAVED;
    document.getElementById('message').className = 'mt-4 text-center font-bold text-green-600';
  } catch (error) {
    console.error('Error saving configuration:', error);
    throw error;
  }
}
