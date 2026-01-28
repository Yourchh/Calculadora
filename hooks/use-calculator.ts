import { useState, useCallback } from 'react';

export type CalculatorMode = 'basic' | 'scientific';

interface CalculatorState {
  display: string;
  operationDisplay: string;
  currentNumber: string;
  previousValue: number | null;
  operation: string | null;
  waitingForNewValue: boolean;
  history: string[];
}

export const useCalculator = () => {
  const [state, setState] = useState<CalculatorState>({
    display: '0',
    operationDisplay: '',
    currentNumber: '0',
    previousValue: null,
    operation: null,
    waitingForNewValue: false,
    history: [],
  });

  const clearAll = useCallback(() => {
    setState({
      display: '0',
      operationDisplay: '',
      currentNumber: '0',
      previousValue: null,
      operation: null,
      waitingForNewValue: false,
      history: [],
    });
  }, []);

  const clearHistory = useCallback(() => {
    setState((prev) => ({
      ...prev,
      history: [],
    }));
  }, []);

  const appendNumber = useCallback((num: string) => {
    setState((prev) => {
      let newCurrentNumber = prev.currentNumber;
      
      if (prev.waitingForNewValue) {
        newCurrentNumber = num;
      } else if (prev.currentNumber === '0' && num !== '.') {
        newCurrentNumber = num;
      } else if (num === '.' && prev.currentNumber.includes('.')) {
        return prev;
      } else {
        newCurrentNumber = prev.currentNumber + num;
      }

      const newDisplay = prev.operationDisplay ? `${prev.operationDisplay}${newCurrentNumber}` : newCurrentNumber;
      
      return {
        ...prev,
        currentNumber: newCurrentNumber,
        display: newDisplay,
        waitingForNewValue: false,
      };
    });
  }, []);

  const setOperation = useCallback((op: string) => {
    setState((prev) => {
      const currentValue = parseFloat(prev.currentNumber);
      let newOperationDisplay = prev.operationDisplay;

      if (prev.previousValue === null) {
        newOperationDisplay = `${currentValue}${op}`;
        return {
          ...prev,
          previousValue: currentValue,
          operation: op,
          operationDisplay: newOperationDisplay,
          display: newOperationDisplay,
          currentNumber: '0',
          waitingForNewValue: true,
        };
      }

      if (prev.waitingForNewValue) {
        newOperationDisplay = `${prev.previousValue}${op}`;
        return {
          ...prev,
          operation: op,
          operationDisplay: newOperationDisplay,
          display: newOperationDisplay,
        };
      }

      const result = performOperation(prev.previousValue, currentValue, prev.operation || '');
      newOperationDisplay = `${result}${op}`;

      return {
        ...prev,
        display: newOperationDisplay,
        operationDisplay: newOperationDisplay,
        previousValue: result,
        operation: op,
        currentNumber: '0',
        waitingForNewValue: true,
      };
    });
  }, []);

  const calculate = useCallback(() => {
    setState((prev) => {
      if (prev.operation === null || prev.previousValue === null) {
        return prev;
      }

      const currentValue = parseFloat(prev.currentNumber);
      const result = performOperation(prev.previousValue, currentValue, prev.operation);
      const fullExpression = `${prev.operationDisplay}${currentValue}`;

      return {
        ...prev,
        display: result.toString(),
        operationDisplay: '',
        currentNumber: result.toString(),
        previousValue: null,
        operation: null,
        waitingForNewValue: true,
        history: [...prev.history, `${fullExpression} = ${result}`],
      };
    });
  }, []);

  const deleteLast = useCallback(() => {
    setState((prev) => {
      if (prev.currentNumber.length === 1) {
        const newCurrentNumber = '0';
        const newDisplay = prev.operationDisplay ? prev.operationDisplay : '0';
        return {
          ...prev,
          currentNumber: newCurrentNumber,
          display: newDisplay,
        };
      }

      const newCurrentNumber = prev.currentNumber.slice(0, -1);
      const newDisplay = prev.operationDisplay + newCurrentNumber;
      return {
        ...prev,
        currentNumber: newCurrentNumber,
        display: newDisplay,
      };
    });
  }, []);

  const toggleSign = useCallback(() => {
    setState((prev) => {
      const value = parseFloat(prev.currentNumber);
      const newCurrentNumber = (-value).toString();
      const newDisplay = prev.operationDisplay + newCurrentNumber;
      return {
        ...prev,
        currentNumber: newCurrentNumber,
        display: newDisplay,
      };
    });
  }, []);

  const percentage = useCallback(() => {
    setState((prev) => {
      const value = parseFloat(prev.currentNumber);
      const newCurrentNumber = (value / 100).toString();
      const newDisplay = prev.operationDisplay + newCurrentNumber;
      return {
        ...prev,
        currentNumber: newCurrentNumber,
        display: newDisplay,
      };
    });
  }, []);

  const squareRoot = useCallback(() => {
    setState((prev) => {
      const value = parseFloat(prev.currentNumber);
      if (value < 0) return prev;
      const newCurrentNumber = Math.sqrt(value).toString();
      const newDisplay = prev.operationDisplay + newCurrentNumber;
      return {
        ...prev,
        currentNumber: newCurrentNumber,
        display: newDisplay,
      };
    });
  }, []);

  const square = useCallback(() => {
    setState((prev) => {
      const value = parseFloat(prev.currentNumber);
      const newCurrentNumber = (value * value).toString();
      const newDisplay = prev.operationDisplay + newCurrentNumber;
      return {
        ...prev,
        currentNumber: newCurrentNumber,
        display: newDisplay,
      };
    });
  }, []);

  const sine = useCallback(() => {
    setState((prev) => {
      const value = parseFloat(prev.currentNumber);
      const newCurrentNumber = Math.sin((value * Math.PI) / 180).toString();
      const newDisplay = prev.operationDisplay + newCurrentNumber;
      return {
        ...prev,
        currentNumber: newCurrentNumber,
        display: newDisplay,
      };
    });
  }, []);

  const cosine = useCallback(() => {
    setState((prev) => {
      const value = parseFloat(prev.currentNumber);
      const newCurrentNumber = Math.cos((value * Math.PI) / 180).toString();
      const newDisplay = prev.operationDisplay + newCurrentNumber;
      return {
        ...prev,
        currentNumber: newCurrentNumber,
        display: newDisplay,
      };
    });
  }, []);

  const tangent = useCallback(() => {
    setState((prev) => {
      const value = parseFloat(prev.currentNumber);
      const newCurrentNumber = Math.tan((value * Math.PI) / 180).toString();
      const newDisplay = prev.operationDisplay + newCurrentNumber;
      return {
        ...prev,
        currentNumber: newCurrentNumber,
        display: newDisplay,
      };
    });
  }, []);

  const logarithm = useCallback(() => {
    setState((prev) => {
      const value = parseFloat(prev.currentNumber);
      if (value <= 0) return prev;
      const newCurrentNumber = Math.log10(value).toString();
      const newDisplay = prev.operationDisplay + newCurrentNumber;
      return {
        ...prev,
        currentNumber: newCurrentNumber,
        display: newDisplay,
      };
    });
  }, []);

  const naturalLogarithm = useCallback(() => {
    setState((prev) => {
      const value = parseFloat(prev.currentNumber);
      if (value <= 0) return prev;
      const newCurrentNumber = Math.log(value).toString();
      const newDisplay = prev.operationDisplay + newCurrentNumber;
      return {
        ...prev,
        currentNumber: newCurrentNumber,
        display: newDisplay,
      };
    });
  }, []);

  const exponential = useCallback(() => {
    setState((prev) => {
      const value = parseFloat(prev.currentNumber);
      const newCurrentNumber = Math.exp(value).toString();
      const newDisplay = prev.operationDisplay + newCurrentNumber;
      return {
        ...prev,
        currentNumber: newCurrentNumber,
        display: newDisplay,
      };
    });
  }, []);

  const factorial = useCallback(() => {
    setState((prev) => {
      const value = parseFloat(prev.currentNumber);
      if (value < 0 || !Number.isInteger(value)) return prev;
      
      let result = 1;
      for (let i = 2; i <= value; i++) {
        result *= i;
      }
      
      const newCurrentNumber = result.toString();
      const newDisplay = prev.operationDisplay + newCurrentNumber;
      return {
        ...prev,
        currentNumber: newCurrentNumber,
        display: newDisplay,
      };
    });
  }, []);

  const power = useCallback((exponent: number) => {
    setState((prev) => {
      const value = parseFloat(prev.currentNumber);
      const newCurrentNumber = Math.pow(value, exponent).toString();
      const newDisplay = prev.operationDisplay + newCurrentNumber;
      return {
        ...prev,
        currentNumber: newCurrentNumber,
        display: newDisplay,
      };
    });
  }, []);

  const reciprocal = useCallback(() => {
    setState((prev) => {
      const value = parseFloat(prev.currentNumber);
      if (value === 0) return prev;
      const newCurrentNumber = (1 / value).toString();
      const newDisplay = prev.operationDisplay + newCurrentNumber;
      return {
        ...prev,
        currentNumber: newCurrentNumber,
        display: newDisplay,
      };
    });
  }, []);

  return {
    state,
    display: state.display,
    history: state.history,
    appendNumber,
    setOperation,
    calculate,
    clearAll,
    clearHistory,
    deleteLast,
    toggleSign,
    percentage,
    squareRoot,
    square,
    sine,
    cosine,
    tangent,
    logarithm,
    naturalLogarithm,
    exponential,
    factorial,
    power,
    reciprocal,
  };
};

function performOperation(prev: number, current: number, operation: string): number {
  switch (operation) {
    case '+':
      return prev + current;
    case '-':
      return prev - current;
    case '*':
      return prev * current;
    case '/':
      return current !== 0 ? prev / current : 0;
    default:
      return current;
  }
}
