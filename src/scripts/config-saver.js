import { API_ENDPOINTS, MESSAGES } from './config-variables.js';

// In config-saver.js
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

    const responseText = await response.text();
    console.log('Raw server response:', responseText);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}, response: ${responseText}`);
    }

    let savedConfig;
    try {
      savedConfig = JSON.parse(responseText);
    } catch (parseError) {
      console.error('Failed to parse response as JSON:', parseError);
      throw new Error(`Server returned invalid JSON: ${responseText}`);
    }

    // Update window.currentRules with the response if needed
    window.currentRules = savedConfig.rules || window.currentRules;

    return savedConfig;
  } catch (error) {
    console.error('Error saving configuration:', error);
    throw error;
  }
}
