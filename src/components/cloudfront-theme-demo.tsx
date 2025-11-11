import { useState } from 'react';
import Calculator from './Calculator';
import { CalculatorIcon } from 'lucide-react';

export function CloudFrontThemeDemo() {
  return (
    <div className="p-6 space-y-6 max-w-md mx-auto">
      <div className="bg-white rounded-lg border p-6">
        <div className="flex items-center justify-center gap-2 mb-6">
          <CalculatorIcon className="h-8 w-8 text-indigo-600" />
          <h1 className="text-3xl font-bold text-gray-800">Simple Calculator</h1>
        </div>
        
        <Calculator />
      </div>
    </div>
  );
}
