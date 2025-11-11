import { useState } from 'react';
import { Delete, RotateCcw } from 'lucide-react';

const Calculator = () => {
  const [display, setDisplay] = useState('0');
  const [currentValue, setCurrentValue] = useState('0');
  const [previousValue, setPreviousValue] = useState<string | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const clearAll = () => {
    setDisplay('0');
    setCurrentValue('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  const clearEntry = () => {
    setDisplay('0');
    setCurrentValue('0');
    setWaitingForOperand(false);
  };

  const backspace = () => {
    if (waitingForOperand) return;
    
    const newValue = currentValue.length > 1 
      ? currentValue.slice(0, -1) 
      : '0';
    
    setCurrentValue(newValue);
    setDisplay(newValue);
  };

  const inputDigit = (digit: string) => {
    if (waitingForOperand) {
      setCurrentValue(digit);
      setDisplay(digit);
      setWaitingForOperand(false);
    } else {
      const newValue = currentValue === '0' ? digit : currentValue + digit;
      setCurrentValue(newValue);
      setDisplay(newValue);
    }
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setCurrentValue('0.');
      setDisplay('0.');
      setWaitingForOperand(false);
      return;
    }

    if (!currentValue.includes('.')) {
      setCurrentValue(currentValue + '.');
      setDisplay(currentValue + '.');
    }
  };

  const performOperation = (nextOperation: string) => {
    const inputValue = parseFloat(currentValue);

    if (previousValue === null) {
      setPreviousValue(currentValue);
    } else if (operation) {
      const currentValueNum = parseFloat(currentValue);
      const previousValueNum = parseFloat(previousValue);
      
      let newValue: number;
      
      switch (operation) {
        case '+':
          newValue = previousValueNum + currentValueNum;
          break;
        case '-':
          newValue = previousValueNum - currentValueNum;
          break;
        case '×':
          newValue = previousValueNum * currentValueNum;
          break;
        case '÷':
          newValue = previousValueNum / currentValueNum;
          break;
        default:
          newValue = currentValueNum;
      }
      
      const resultString = newValue.toString();
      setPreviousValue(resultString);
      setDisplay(resultString);
      setCurrentValue(resultString);
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  const calculateResult = () => {
    if (!previousValue || !operation) return;

    const currentValueNum = parseFloat(currentValue);
    const previousValueNum = parseFloat(previousValue);
    
    let newValue: number;
    
    switch (operation) {
      case '+':
        newValue = previousValueNum + currentValueNum;
        break;
      case '-':
        newValue = previousValueNum - currentValueNum;
        break;
      case '×':
        newValue = previousValueNum * currentValueNum;
        break;
      case '÷':
        newValue = previousValueNum / currentValueNum;
        break;
      default:
        return;
    }
    
    const resultString = newValue.toString();
    
    setDisplay(resultString);
    setCurrentValue(resultString);
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(true);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    let { key } = event;
    
    if (key === 'Enter') key = '=';
    if (key === '*') key = '×';
    if (key === '/') key = '÷';
    
    if (/\d/.test(key)) {
      event.preventDefault();
      inputDigit(key);
    } else if (key === '.') {
      event.preventDefault();
      inputDecimal();
    } else if (key === 'Backspace') {
      event.preventDefault();
      backspace();
    } else if (key === 'Escape') {
      event.preventDefault();
      clearAll();
    } else if (key === '+' || key === '-' || key === '×' || key === '÷') {
      event.preventDefault();
      performOperation(key);
    } else if (key === '=') {
      event.preventDefault();
      calculateResult();
    }
  };

  return (
    <div 
      className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200"
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      {/* Display */}
      <div className="p-4 bg-gray-900 text-right">
        <div className="h-6 text-gray-400 text-sm mb-1">
          {previousValue} {operation}
        </div>
        <div className="text-white text-4xl font-medium tracking-wider overflow-x-auto whitespace-nowrap">
          {display}
        </div>
      </div>
      
      {/* Keypad */}
      <div className="grid grid-cols-4 gap-1 p-2 bg-gray-100">
        {/* Row 1 */}
        <button 
          onClick={clearAll}
          className="col-span-2 bg-red-500 hover:bg-red-600 text-white p-4 rounded-lg font-medium transition-colors flex items-center justify-center"
        >
          <RotateCcw className="h-5 w-5 mr-1" />
          AC
        </button>
        <button 
          onClick={clearEntry}
          className="bg-red-400 hover:bg-red-500 text-white p-4 rounded-lg font-medium transition-colors"
        >
          CE
        </button>
        <button 
          onClick={backspace}
          className="bg-red-400 hover:bg-red-500 text-white p-4 rounded-lg font-medium transition-colors flex items-center justify-center"
        >
          <Delete className="h-5 w-5" />
        </button>
        
        {/* Row 2 */}
        <button 
          onClick={() => inputDigit('7')}
          className="bg-white hover:bg-gray-200 p-4 rounded-lg font-medium transition-colors"
        >
          7
        </button>
        <button 
          onClick={() => inputDigit('8')}
          className="bg-white hover:bg-gray-200 p-4 rounded-lg font-medium transition-colors"
        >
          8
        </button>
        <button 
          onClick={() => inputDigit('9')}
          className="bg-white hover:bg-gray-200 p-4 rounded-lg font-medium transition-colors"
        >
          9
        </button>
        <button 
          onClick={() => performOperation('÷')}
          className={`bg-indigo-500 hover:bg-indigo-600 text-white p-4 rounded-lg font-medium transition-colors ${operation === '÷' ? 'ring-2 ring-indigo-300' : ''}`}
        >
          ÷
        </button>
        
        {/* Row 3 */}
        <button 
          onClick={() => inputDigit('4')}
          className="bg-white hover:bg-gray-200 p-4 rounded-lg font-medium transition-colors"
        >
          4
        </button>
        <button 
          onClick={() => inputDigit('5')}
          className="bg-white hover:bg-gray-200 p-4 rounded-lg font-medium transition-colors"
        >
          5
        </button>
        <button 
          onClick={() => inputDigit('6')}
          className="bg-white hover:bg-gray-200 p-4 rounded-lg font-medium transition-colors"
        >
          6
        </button>
        <button 
          onClick={() => performOperation('×')}
          className={`bg-indigo-500 hover:bg-indigo-600 text-white p-4 rounded-lg font-medium transition-colors ${operation === '×' ? 'ring-2 ring-indigo-300' : ''}`}
        >
          ×
        </button>
        
        {/* Row 4 */}
        <button 
          onClick={() => inputDigit('1')}
          className="bg-white hover:bg-gray-200 p-4 rounded-lg font-medium transition-colors"
        >
          1
        </button>
        <button 
          onClick={() => inputDigit('2')}
          className="bg-white hover:bg-gray-200 p-4 rounded-lg font-medium transition-colors"
        >
          2
        </button>
        <button 
          onClick={() => inputDigit('3')}
          className="bg-white hover:bg-gray-200 p-4 rounded-lg font-medium transition-colors"
        >
          3
        </button>
        <button 
          onClick={() => performOperation('-')}
          className={`bg-indigo-500 hover:bg-indigo-600 text-white p-4 rounded-lg font-medium transition-colors ${operation === '-' ? 'ring-2 ring-indigo-300' : ''}`}
        >
          -
        </button>
        
        {/* Row 5 */}
        <button 
          onClick={() => inputDigit('0')}
          className="bg-white hover:bg-gray-200 p-4 rounded-lg font-medium transition-colors"
        >
          0
        </button>
        <button 
          onClick={inputDecimal}
          className="bg-white hover:bg-gray-200 p-4 rounded-lg font-medium transition-colors"
        >
          .
        </button>
        <button 
          onClick={calculateResult}
          className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-lg font-medium transition-colors"
        >
          =
        </button>
        <button 
          onClick={() => performOperation('+')}
          className={`bg-indigo-500 hover:bg-indigo-600 text-white p-4 rounded-lg font-medium transition-colors ${operation === '+' ? 'ring-2 ring-indigo-300' : ''}`}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default Calculator;
