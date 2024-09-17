import { createRuleForm, updateRuleModals } from './rule-forms.js';
import { saveConfiguration } from './config-saver.js';
import { ADD_RULE_BUTTON_TEXT, MESSAGES } from './config-variables.js';

export function initializeUI() {
  const addNewRuleBtn = document.getElementById('addNewRule');
  const ruleModals = document.getElementById('ruleModals');
  const configFormContainer = document.getElementById('configFormContainer');
  const configForm = document.getElementById('configForm');
  const rulesContainer = document.getElementById('rulesContainer');
  const cancelEditBtn = document.getElementById('cancelEdit');

  addNewRuleBtn.textContent = ADD_RULE_BUTTON_TEXT;

  addNewRuleBtn.onclick = () => {
    console.log('Add New Rule clicked'); // Debug log
    ruleModals.classList.add('hidden');
    addNewRuleBtn.classList.add('hidden');
    configFormContainer.classList.remove('hidden');
    rulesContainer.innerHTML = '';
    createRuleForm();
  };

  cancelEditBtn.onclick = () => {
    ruleModals.classList.remove('hidden');
    addNewRuleBtn.classList.remove('hidden');
    configFormContainer.classList.add('hidden');
  };

  configForm.onsubmit = async (e) => {
    e.preventDefault();
    try {
      await saveConfiguration();
      updateRuleModals();
      ruleModals.classList.remove('hidden');
      addNewRuleBtn.classList.remove('hidden');
      configFormContainer.classList.add('hidden');
      document.getElementById('message').textContent = MESSAGES.CONFIG_SAVED;
      document.getElementById('message').className = 'mt-4 text-center font-bold text-green-600';
    } catch (error) {
      document.getElementById('message').textContent = MESSAGES.SAVE_ERROR + error.message;
      document.getElementById('message').className = 'mt-4 text-center font-bold text-red-600';
    }
  };

  console.log('UI initialized'); // Debug log
}
