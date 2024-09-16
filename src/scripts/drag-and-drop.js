export function dragStart(e) {
  window.draggedItem = e.target;
  e.dataTransfer.effectAllowed = 'move';
  e.dataTransfer.setData('text/plain', e.target.getAttribute('data-id'));
  setTimeout(() => {
    e.target.style.opacity = '0.5';
    e.target.style.transform = 'scale(1.05)';
  }, 0);
}

export function dragOver(e) {
  e.preventDefault();
  e.dataTransfer.dropEffect = 'move';
  const targetItem = e.target.closest('[draggable]');
  if (targetItem && targetItem !== window.draggedItem) {
    const rect = targetItem.getBoundingClientRect();
    const next = (e.clientY - rect.top) / (rect.bottom - rect.top) > 0.5;
    targetItem.parentNode.insertBefore(
      window.draggedItem,
      next ? targetItem.nextSibling : targetItem
    );
  }
}

export function drop(e) {
  e.preventDefault();
  const draggedIndex = parseInt(window.draggedItem.getAttribute('data-id'));
  const targetIndex = Array.from(window.draggedItem.parentNode.children).indexOf(
    window.draggedItem
  );

  if (draggedIndex !== targetIndex) {
    const [reorderedItem] = window.currentRules.splice(draggedIndex, 1);
    window.currentRules.splice(targetIndex, 0, reorderedItem);
    updateDataIds();
    saveConfiguration();
  }
}

export function dragEnd(e) {
  e.target.style.opacity = '';
  e.target.style.transform = '';
  window.draggedItem = null;
}

function updateDataIds() {
  const modals = document.querySelectorAll('#ruleModals > div');
  modals.forEach((modal, index) => {
    modal.setAttribute('data-id', index);
  });
}

function saveConfiguration() {
  // This function should be implemented to save the configuration
  // You might want to implement this in a separate file and import it here
  console.log('Saving configuration');
}
