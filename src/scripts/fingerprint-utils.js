import { FINGERPRINT_PARAMS, FINGERPRINT_TOOLTIPS } from './config-variables.js';

export function addFingerprint(ruleIndex) {
  const select = document.getElementById(`fingerprintParam${ruleIndex}`);
  const list = document.getElementById(`fingerprintList${ruleIndex}`);
  const selectedValue = select.value;

  let fingerprintValue = selectedValue;

  if (selectedValue === 'headers.name') {
    const headerName = document.getElementById(`headerName${ruleIndex}`).value;
    if (!headerName) {
      alert('Please enter a header name.');
      return;
    }
    fingerprintValue = `headers.name:${headerName}`;
  } else if (selectedValue === 'headers.nameValue') {
    const headerName = document.getElementById(`headerName${ruleIndex}`).value;
    const headerValue = document.getElementById(`headerValue${ruleIndex}`).value;
    if (!headerName || !headerValue) {
      alert('Please enter both header name and value.');
      return;
    }
    fingerprintValue = `headers.nameValue:${headerName}:${headerValue}`;
  } else if (selectedValue === 'body') {
    fingerprintValue = 'body';
  } else if (selectedValue === 'body.custom') {
    const bodyField = document.getElementById(`bodyField${ruleIndex}`).value;
    if (!bodyField) {
      alert('Please enter a body field.');
      return;
    }
    fingerprintValue = `body.custom:${bodyField}`;
  }

  addToList(list, fingerprintValue, ruleIndex);
}

export function removeFingerprint(fingerprintElement) {
  fingerprintElement.remove();
}

export function addToList(list, value, ruleIndex) {
  const item = document.createElement('div');
  item.className = 'flex justify-between items-center mb-2 p-2 bg-gray-100 rounded';

  let displayValue = value;
  if (value.startsWith('headers.name:')) {
    displayValue = `Header value: ${value.split(':')[1]}`;
  } else if (value.startsWith('headers.nameValue:')) {
    const [, name, val] = value.split(':');
    displayValue = `Header ${name}: ${val}`;
  } else if (value.startsWith('body.custom:')) {
    displayValue = `Body field: ${value.split(':')[1]}`;
  }

  item.innerHTML = `
    <span>${displayValue}</span>
    <input type="hidden" name="rules[${ruleIndex}].fingerprint.parameters[]" value="${value}">
    <button type="button" class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded text-xs" onclick="removeFingerprint(this.parentNode)">Remove</button>
  `;
  list.appendChild(item);

  const tooltip = document.createElement('div');
  tooltip.className = 'hidden absolute z-10 p-2 bg-gray-800 text-white text-sm rounded shadow-lg';
  tooltip.textContent = FINGERPRINT_TOOLTIPS[value] || 'No description available';
  item.appendChild(tooltip);

  item.querySelector('span').onmouseenter = () => tooltip.classList.remove('hidden');
  item.querySelector('span').onmouseleave = () => tooltip.classList.add('hidden');
}

export function updateFingerprintFields(ruleIndex) {
  const selectedType = document.getElementById(`fingerprintParam${ruleIndex}`).value;
  const additionalFieldsContainer = document.getElementById(
    `fingerprintAdditionalFields${ruleIndex}`
  );

  let additionalFieldsHTML = '';

  const inputClasses =
    'w-full pl-3 pr-3 py-2 text-base border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md shadow-sm bg-white';

  if (selectedType === 'headers.name' || selectedType === 'headers.nameValue') {
    additionalFieldsHTML += `
      <div class="flex space-x-2">
        <div class="flex-grow">
          <label class="block text-sm font-medium text-gray-700 mb-1">Header Name</label>
          <input type="text" id="headerName${ruleIndex}" class="${inputClasses}">
        </div>
    `;

    if (selectedType === 'headers.nameValue') {
      additionalFieldsHTML += `
        <div class="flex-grow">
          <label class="block text-sm font-medium text-gray-700 mb-1">Header Value</label>
          <input type="text" id="headerValue${ruleIndex}" class="${inputClasses}">
        </div>
      `;
    }

    additionalFieldsHTML += `</div>`;
  } else if (selectedType === 'body' || selectedType === 'body.custom') {
    additionalFieldsHTML += `
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">
          ${selectedType === 'body' ? 'Request Body' : 'Body Field (JSON path)'}
        </label>
        <input type="text" id="bodyField${ruleIndex}" class="${inputClasses}">
      </div>
    `;
  }

  additionalFieldsContainer.innerHTML = additionalFieldsHTML;
}
