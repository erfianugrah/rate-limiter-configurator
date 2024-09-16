import { createRuleForm, updateRuleModals } from './rule-forms.js';
import { saveConfiguration } from './config-saver.js';
import { ADD_RULE_BUTTON_TEXT, MESSAGES } from './config-variables.js';

export function initializeUI() {
  const addNewRuleBtn = document.getElementById('addNewRule');
  const ruleModals = document.getElementById('ruleModals');
  const configForm = document.getElementById('configForm');
  const rulesContainer = document.getElementById('rulesContainer');
  const cancelEditBtn = document.getElementById('cancelEdit');
  const saveConfigBtn = document.getElementById('saveConfig');

  addNewRuleBtn.textContent = ADD_RULE_BUTTON_TEXT;

  addNewRuleBtn.onclick = () => {
    ruleModals.classList.add('hidden');
    addNewRuleBtn.classList.add('hidden');
    configForm.classList.remove('hidden');
    rulesContainer.innerHTML = '';
    createRuleForm();
  };

  cancelEditBtn.onclick = () => {
    ruleModals.classList.remove('hidden');
    addNewRuleBtn.classList.remove('hidden');
    configForm.classList.add('hidden');
  };

  saveConfigBtn.onclick = async () => {
    try {
      await saveConfiguration();
      updateRuleModals();
      ruleModals.classList.remove('hidden');
      addNewRuleBtn.classList.remove('hidden');
      configForm.classList.add('hidden');
    } catch (error) {
      const messageEl = document.getElementById('message');
      messageEl.textContent = MESSAGES.SAVE_ERROR + error.message;
      messageEl.className = 'mt-4 text-center font-bold text-red-600';
    }
  };
}
