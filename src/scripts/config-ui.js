import { updateRuleModals } from './rule-forms.js';
import { MESSAGES } from './config-variables.js';

// Initialize currentRules as an empty array
window.currentRules = [];

document.addEventListener('astro:page-load', () => {
  const rulesData = document.getElementById('rulesData');
  if (rulesData) {
    window.currentRules = JSON.parse(rulesData.textContent);
    updateRuleModals();
  }
});

export function displayMessage(message, isError = false) {
  const messageEl = document.getElementById('message');
  messageEl.textContent = message;
  messageEl.className = `mt-4 text-center font-bold ${isError ? 'text-red-600' : 'text-green-600'}`;
}

export function handleError(error) {
  console.error('Error:', error);
  displayMessage(MESSAGES.LOAD_ERROR, true);
}
