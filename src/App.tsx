import Calculator from './components/Calculator';
import { CalculatorIcon } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <header className="flex items-center justify-center gap-2 mb-6">
          <CalculatorIcon className="h-8 w-8 text-indigo-600" />
          <h1 className="text-3xl font-bold text-gray-800">Simple Calculator</h1>
        </header>
        
        <Calculator />
        
        <footer className="mt-8 text-center text-gray-500 text-sm">
          <p>Built with React & Tailwind CSS</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
