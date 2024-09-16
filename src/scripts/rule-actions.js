export function viewRule(rule) {
  const viewModal = document.createElement('div');
  viewModal.className =
    'fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center';
  viewModal.innerHTML = `
    <div class="relative p-8 border w-full max-w-xl shadow-lg rounded-md bg-white">
        <h3 class="text-2xl leading-6 font-medium text-gray-900 mb-4">Rule Details</h3>
        <pre class="text-left whitespace-pre-wrap break-words bg-gray-100 p-4 rounded">${JSON.stringify(rule, null, 2)}</pre>
        <button id="closeViewModal" class="mt-6 px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-colors duration-200">
            Close
        </button>
    </div>
  `;
  document.body.appendChild(viewModal);
  document.getElementById('closeViewModal').onclick = () => document.body.removeChild(viewModal);
}

export function editRule(rule, index) {
  console.log('Editing rule:', rule);
  console.log('Rule index:', index);

  document.getElementById('ruleModals').classList.add('hidden');
  document.getElementById('addNewRule').classList.add('hidden');
  document.getElementById('rulesContainer').classList.remove('hidden');

  const ruleForm = document.querySelector(`[data-rule-index="${index}"]`);
  if (ruleForm) {
    ruleForm.scrollIntoView({ behavior: 'smooth' });
  }
}

export function deleteRule(index) {
  if (confirm('Are you sure you want to delete this rule?')) {
    window.currentRules.splice(index, 1);
    updateRuleModals();
    saveConfiguration();
  }
}

function updateRuleModals() {
  // This function should be implemented to update the rule modals after a change
  // You might want to implement this in a separate file and import it here
  console.log('Updating rule modals');
}

function saveConfiguration() {
  // This function should be implemented to save the configuration
  // You might want to implement this in a separate file and import it here
  console.log('Saving configuration');
}
