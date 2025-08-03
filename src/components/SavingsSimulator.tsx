import React, { useState } from 'react';
import { Slider } from './Slider';
import { Expense, SavingsScenario } from '../types';
import { calculatePotentialSavings, calculateCompoundInterest, formatCurrency } from '../utils/calculations';

interface SavingsSimulatorProps {
  expenses: Expense[];
  onScenarioChange: (scenario: SavingsScenario) => void;
}

export const SavingsSimulator: React.FC<SavingsSimulatorProps> = ({
  expenses,
  onScenarioChange,
}) => {
  const [scenario, setScenario] = useState<SavingsScenario>({
    diningReduction: 0,
    entertainmentReduction: 0,
    shoppingReduction: 0,
    subscriptionReduction: 0,
    transportationReduction: 0,
    luxuryReduction: 0,
  });

  const handleScenarioChange = (key: keyof SavingsScenario, value: number) => {
    const newScenario = { ...scenario, [key]: value };
    setScenario(newScenario);
    onScenarioChange(newScenario);
  };

  const potentialSavings = calculatePotentialSavings(expenses, scenario);
  const projections = [5, 10, 15, 20, 30].map(years => calculateCompoundInterest(potentialSavings, 0.10, years));

  // Calculate current amounts for each category
  const categoryAmounts = expenses.reduce((acc, expense) => {
    const category = expense.category.toLowerCase();
    acc[category] = (acc[category] || 0) + expense.amount;
    return acc;
  }, {} as { [key: string]: number });

  // Calculate luxury expenses total
  const luxuryTotal = expenses
    .filter(expense => expense.type === 'luxuries')
    .reduce((sum, expense) => sum + expense.amount, 0);
  const simulatorItems = [
    {
      key: 'diningReduction' as keyof SavingsScenario,
      label: 'Dining Out',
      currentAmount: categoryAmounts.dining || 0,
      reduction: scenario.diningReduction,
      icon: '🍽️',
    },
    {
      key: 'entertainmentReduction' as keyof SavingsScenario,
      label: 'Entertainment',
      currentAmount: categoryAmounts.entertainment || 0,
      reduction: scenario.entertainmentReduction,
      icon: '🎬',
    },
    {
      key: 'shoppingReduction' as keyof SavingsScenario,
      label: 'Shopping',
      currentAmount: categoryAmounts.shopping || 0,
      reduction: scenario.shoppingReduction,
      icon: '🛍️',
    },
    {
      key: 'subscriptionReduction' as keyof SavingsScenario,
      label: 'Subscriptions',
      currentAmount: categoryAmounts.subscriptions || 0,
      reduction: scenario.subscriptionReduction,
      icon: '📱',
    },
    {
      key: 'transportationReduction' as keyof SavingsScenario,
      label: 'Transportation',
      currentAmount: categoryAmounts.transportation || 0,
      reduction: scenario.transportationReduction,
      icon: '🚗',
    },
    {
      key: 'luxuryReduction' as keyof SavingsScenario,
      label: 'Luxury Items',
      currentAmount: luxuryTotal,
      reduction: scenario.luxuryReduction,
      icon: '💎',
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Savings Simulator</h2>
      
      <div className="space-y-6 mb-8">
        {simulatorItems.map(item => (
          <div key={item.key} className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{item.icon}</span>
                <div>
                  <h3 className="font-semibold text-gray-800">{item.label}</h3>
                  <p className="text-sm text-gray-600">
                    Current: {formatCurrency(item.currentAmount)}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-green-600">
                  -{formatCurrency(item.currentAmount * (item.reduction / 100))}
                </p>
                <p className="text-sm text-gray-600">{item.reduction}% reduction</p>
              </div>
            </div>
            <Slider
              value={item.reduction}
              onChange={(value) => handleScenarioChange(item.key, value)}
              min={0}
              max={50}
              step={5}
              disabled={item.currentAmount === 0}
            />
          </div>
        ))}
      </div>

      {potentialSavings > 0 && (
        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            Monthly Savings Potential: {formatCurrency(potentialSavings)}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {projections.map((projection) => (
              <div key={projection.years} className="bg-white rounded-lg p-4 text-center">
                <h4 className="font-semibold text-gray-800 mb-2">{projection.years} Years</h4>
                <p className="text-2xl font-bold text-green-600 mb-1">
                  {formatCurrency(projection.futureValue)}
                </p>
                <p className="text-sm text-gray-600">
                  Interest: {formatCurrency(projection.interestEarned)}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Contributions: {formatCurrency(projection.totalContributions)}
                </p>
              </div>
            ))}
          </div>
          
          <div className="mt-4 p-3 bg-blue-100 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Assumptions:</strong> 10% annual return, monthly contributions, compound interest calculated monthly
            </p>
          </div>
        </div>
      )}
    </div>
  );
};