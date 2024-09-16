export function initializeFormInteractivity() {
  document.addEventListener('input', handleFormInput);
  document.addEventListener('change', handleFormChange);
}

function handleFormInput(event) {
  if (event.target.hasAttribute('required')) {
    validateRequiredField(event.target);
  }
}

function handleFormChange(event) {
  if (event.target.name.includes('action.type')) {
    const ruleIndex = event.target.name.match(/\d+/)[0];
    updateActionFields(ruleIndex, event.target.value);
  }
}

function validateRequiredField(field) {
  const isValid = field.value.trim() !== '';
  field.classList.toggle('border-red-500', !isValid);
  field.classList.toggle('border-gray-300', isValid);

  const errorMessage = field.nextElementSibling;
  if (errorMessage && errorMessage.classList.contains('error-message')) {
    errorMessage.textContent = isValid ? '' : 'This field is required';
  } else if (!isValid) {
    const error = document.createElement('p');
    error.className = 'error-message text-red-500 text-xs italic mt-1';
    error.textContent = 'This field is required';
    field.parentNode.insertBefore(error, field.nextSibling);
  }
}

export function updateActionFields(ruleIndex, actionType) {
  const actionFields = document.getElementById(`actionFields${ruleIndex}`);
  const inputClasses =
    'mt-1 block w-full pl-3 pr-3 py-2 text-base border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md';

  let fieldsHTML = '';
  switch (actionType) {
    case 'customResponse':
      fieldsHTML = `
        <div>
          <label class="block text-sm font-medium text-gray-700" for="customStatusCode${ruleIndex}">Status Code:</label>
          <input type="number" id="customStatusCode${ruleIndex}" name="rules[${ruleIndex}].action.statusCode" class="${inputClasses}" required>
        </div>
        <div class="mt-4">
          <label class="block text-sm font-medium text-gray-700" for="customResponseBody${ruleIndex}">Response Body (JSON):</label>
          <textarea id="customResponseBody${ruleIndex}" name="rules[${ruleIndex}].action.body" class="${inputClasses} h-24" rows="4" required></textarea>
        </div>
      `;
      break;
    case 'block':
    case 'rateLimit':
      fieldsHTML = `
        <div class="text-sm text-gray-600">
          This action will ${actionType === 'block' ? 'block the request with a 403 status' : 'rate limit the request with a 429 status'}.
        </div>
      `;
      break;
    case 'log':
    case 'simulate':
      fieldsHTML = `
        <div class="text-sm text-gray-600">
          This action will ${actionType === 'log' ? 'log the request without taking action' : 'simulate rate limiting without actually blocking requests'}.
        </div>
      `;
      break;
  }

  actionFields.innerHTML = fieldsHTML;
}
