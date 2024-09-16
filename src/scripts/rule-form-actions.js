import { createConditionFields, createConditionGroup, createOperator } from './request-match-utils';

export function addCondition(ruleIndex) {
  const conditionsContainer = document.getElementById(`requestMatchConditions${ruleIndex}`);
  const currentConditions = conditionsContainer.children.length;

  if (currentConditions > 0) {
    const operatorHtml = createOperator(
      `rules[${ruleIndex}].requestMatch.conditions[${currentConditions - 1}]`
    );
    conditionsContainer.insertAdjacentHTML('beforeend', operatorHtml);
  }

  const newConditionHTML = createConditionFields(ruleIndex, currentConditions);
  conditionsContainer.insertAdjacentHTML('beforeend', newConditionHTML);
}

export function addConditionGroup(ruleIndex) {
  const conditionsContainer = document.getElementById(`requestMatchConditions${ruleIndex}`);
  const currentConditions = conditionsContainer.children.length;

  if (currentConditions > 0) {
    const operatorHtml = createOperator(
      `rules[${ruleIndex}].requestMatch.conditions[${currentConditions - 1}]`
    );
    conditionsContainer.insertAdjacentHTML('beforeend', operatorHtml);
  }

  const newGroupHTML = createConditionGroup(ruleIndex, currentConditions, { conditions: [] });
  conditionsContainer.insertAdjacentHTML('beforeend', newGroupHTML);
  addConditionToGroup(ruleIndex, currentConditions);
}

export function addConditionToGroup(ruleIndex, groupIndex) {
  const groupContainer = document.getElementById(`groupConditions${ruleIndex}_${groupIndex}`);
  const currentConditions = groupContainer.children.length;

  if (currentConditions > 0) {
    const operatorHtml = createOperator(
      `rules[${ruleIndex}].requestMatch.conditions[${groupIndex}].conditions[${currentConditions - 1}]`
    );
    groupContainer.insertAdjacentHTML('beforeend', operatorHtml);
  }

  const newConditionHTML = createConditionFields(
    ruleIndex,
    `${groupIndex}_${currentConditions}`,
    {},
    true
  );
  groupContainer.insertAdjacentHTML('beforeend', newConditionHTML);
}

export function removeCondition(ruleIndex, conditionIndex) {
  const conditionElement = document.getElementById(`condition${ruleIndex}_${conditionIndex}`);
  if (conditionElement) {
    const parentContainer = conditionElement.parentElement;
    const prevSibling = conditionElement.previousElementSibling;
    const nextSibling = conditionElement.nextElementSibling;

    conditionElement.remove();

    if (prevSibling && prevSibling.classList.contains('operator-select')) {
      prevSibling.remove();
    } else if (nextSibling && nextSibling.classList.contains('operator-select')) {
      nextSibling.remove();
    }

    // Renumber remaining conditions
    const remainingConditions = parentContainer.querySelectorAll('.condition-field');
    remainingConditions.forEach((condition, index) => {
      condition.id = `condition${ruleIndex}_${index}`;
    });
  }
}

export function removeConditionGroup(ruleIndex, groupIndex) {
  const groupElement = document.getElementById(`group${ruleIndex}_${groupIndex}`);
  if (groupElement) {
    const parentContainer = groupElement.parentElement;
    const prevSibling = groupElement.previousElementSibling;
    const nextSibling = groupElement.nextElementSibling;

    groupElement.remove();

    if (prevSibling && prevSibling.classList.contains('operator-select')) {
      prevSibling.remove();
    } else if (nextSibling && nextSibling.classList.contains('operator-select')) {
      nextSibling.remove();
    }

    // Renumber remaining groups
    const remainingGroups = parentContainer.querySelectorAll('.condition-group');
    remainingGroups.forEach((group, index) => {
      group.id = `group${ruleIndex}_${index}`;
    });
  }
}

export function removeFingerprint(fingerprintElement) {
  fingerprintElement.remove();
}
