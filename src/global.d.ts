export {};

declare global {
  interface Window {
    addCondition: (index: number) => void;
    addConditionGroup: (index: number) => void;
    addConditionToGroup: (index: number, groupIndex: number) => void;
    removeCondition: (index: number, conditionIndex: string) => void;
    removeConditionGroup: (index: number, groupIndex: number) => void;
    addFingerprint: (index: number) => void;
    removeFingerprint: (element: HTMLElement) => void;
    createOperator: (namePrefix: string, selectedOperator?: string) => string;
    updateConditionFields: (
      selectElement: HTMLSelectElement,
      ruleIndex: number,
      conditionIndex: string
    ) => void;
  }
}
