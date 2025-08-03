import React, { useState } from 'react';
import { Brain, Loader, AlertCircle } from 'lucide-react';
import { FinancialData, AIInsight, SavingsScenario } from '../types';
import { calculatePotentialSavings, calculateSavingsHealthScore, formatCurrency } from '../utils/calculations';

interface AICoachProps {
  financialData: FinancialData;
  savingsScenario: SavingsScenario;
}

export const AICoach: React.FC<AICoachProps> = ({ financialData, savingsScenario }) => {
  const [aiInsight, setAiInsight] = useState<AIInsight | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateInsights = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Since we don't have OpenAI API key in this demo, we'll simulate AI insights
      // In a real implementation, this would call the OpenAI API
      const mockInsight = generateMockInsight(financialData, savingsScenario);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setAiInsight(mockInsight);
    } catch (err) {
      setError('Failed to generate AI insights. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const generateMockInsight = (data: FinancialData, scenario: SavingsScenario): AIInsight => {
    const totalExpenses = data.expenses.reduce((sum, exp) => sum + exp.amount, 0);
    const potentialSavings = calculatePotentialSavings(data.expenses, scenario);
    const healthScore = calculateSavingsHealthScore(data.monthlyIncome, totalExpenses, potentialSavings);
    
    const needsExpenses = data.expenses.filter(exp => exp.type === 'needs');
    const wantsExpenses = data.expenses.filter(exp => exp.type === 'wants');
    const luxuryExpenses = data.expenses.filter(exp => exp.type === 'luxuries');
    
    const emergencyFundTarget = data.monthlyIncome * 6; // 6 months of income
    
    return {
      categorization: {
        needs: needsExpenses.map(exp => `${exp.category}: $${exp.amount}`),
        wants: wantsExpenses.map(exp => `${exp.category}: $${exp.amount}`),
        luxuries: luxuryExpenses.map(exp => `${exp.category}: $${exp.amount}`),
        suggestions: [
          potentialSavings > 100 ? 'Great potential for savings with current adjustments!' : 'Consider small reductions in discretionary spending',
          'Focus on the 50/30/20 rule: 50% needs, 30% wants, 20% savings',
          'Track your expenses for 3 months to identify patterns',
          'Consider automating your savings to make it effortless',
          'Review and optimize your subscriptions monthly'
        ]
      },
      savingsRecommendations: {
        monthlyTarget: Math.max(potentialSavings, data.monthlyIncome * 0.2),
        emergencyFundTarget,
        strategies: [
          'Automate your savings to pay yourself first',
          'Use the envelope method for discretionary spending',
          'Review and cancel unused subscriptions monthly',
          'Cook at home more often to reduce dining expenses',
          'Consider the 24-hour rule for non-essential purchases over $50',
          'Set up separate savings accounts for different goals',
          'Use cashback credit cards responsibly for regular expenses'
        ],
        priorityAreas: [
          scenario.diningReduction > 0 ? 'dining' : null,
          scenario.entertainmentReduction > 0 ? 'entertainment' : null,
          scenario.shoppingReduction > 0 ? 'shopping' : null,
          scenario.subscriptionReduction > 0 ? 'subscriptions' : null,
          scenario.transportationReduction > 0 ? 'transportation' : null,
          scenario.luxuryReduction > 0 ? 'luxury items' : null
        ].filter(Boolean) as string[]
      },
      projections: {
        conservative: potentialSavings * 0.7,
        moderate: potentialSavings,
        aggressive: potentialSavings * 1.3
      },
      healthScore,
      motivationalMessage: getMotivationalMessage(healthScore, potentialSavings),
      personalizedTips: generatePersonalizedTips(data, scenario),
      riskAssessment: generateRiskAssessment(data)
    };
  };

  const generatePersonalizedTips = (data: FinancialData, scenario: SavingsScenario): string[] => {
    const tips: string[] = [];
    const totalExpenses = data.expenses.reduce((sum, exp) => sum + exp.amount, 0);
    const savingsRate = ((data.monthlyIncome - totalExpenses) / data.monthlyIncome) * 100;
    
    if (savingsRate < 10) {
      tips.push("Start small - even saving $25/month builds the habit and compounds over time");
    }
    
    if (data.emergencyFund < data.monthlyIncome * 3) {
      tips.push("Prioritize building a 3-6 month emergency fund before aggressive investing");
    }
    
    const diningExpenses = data.expenses.filter(exp => exp.category.toLowerCase() === 'dining').reduce((sum, exp) => sum + exp.amount, 0);
    if (diningExpenses > data.monthlyIncome * 0.15) {
      tips.push("Your dining expenses are high - try meal prepping to save $200+ monthly");
    }
    
    const subscriptionExpenses = data.expenses.filter(exp => exp.category.toLowerCase() === 'subscriptions').reduce((sum, exp) => sum + exp.amount, 0);
    if (subscriptionExpenses > 100) {
      tips.push("Audit your subscriptions - the average person can save $80/month by canceling unused services");
    }
    
    if (scenario.diningReduction > 20) {
      tips.push("Great job reducing dining expenses! Consider investing those savings in a low-cost index fund");
    }
    
    return tips.slice(0, 3); // Return top 3 tips
  };
  
  const generateRiskAssessment = (data: FinancialData): string => {
    const totalExpenses = data.expenses.reduce((sum, exp) => sum + exp.amount, 0);
    const savingsRate = ((data.monthlyIncome - totalExpenses) / data.monthlyIncome) * 100;
    const emergencyFundMonths = data.emergencyFund / (totalExpenses || 1);
    
    if (emergencyFundMonths < 1) {
      return "High Risk: Without an emergency fund, you're vulnerable to financial setbacks. Focus on building emergency savings first.";
    } else if (savingsRate < 5) {
      return "Medium-High Risk: Low savings rate leaves little room for unexpected expenses or future goals.";
    } else if (savingsRate < 15) {
      return "Medium Risk: You're saving something, but increasing your rate would provide more financial security.";
    } else {
      return "Low Risk: Strong savings habits provide good financial resilience and growth potential.";
    }
  };
  const getMotivationalMessage = (score: number, savings: number): string => {
    if (score >= 80) {
      return `Excellent financial discipline! You're on track to save ${formatCurrency(savings)} per month. Keep up the great work!`;
    } else if (score >= 60) {
      return `Good progress! With these adjustments, you could save ${formatCurrency(savings)} monthly. Small changes lead to big results!`;
    } else if (score >= 40) {
      return `You're making positive changes! Every dollar saved is a step toward financial freedom. Focus on one category at a time.`;
    } else {
      return `Every journey starts with a single step. These small adjustments can help you save ${formatCurrency(savings)} per month. You've got this!`;
    }
  };

  const getHealthScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    if (score >= 40) return 'text-orange-600';
    return 'text-red-600';
  };

  const getHealthScoreLabel = (score: number) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    if (score >= 40) return 'Fair';
    return 'Needs Improvement';
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center gap-3 mb-6">
        <Brain className="w-8 h-8 text-blue-600" />
        <h2 className="text-2xl font-bold text-gray-800">AI Financial Coach</h2>
      </div>

      {!aiInsight && !isLoading && (
        <div className="text-center py-8">
          <p className="text-gray-600 mb-4">
            Get personalized insights and recommendations from our AI financial coach
          </p>
          <button
            onClick={generateInsights}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
          >
            Generate AI Insights
          </button>
        </div>
      )}

      {isLoading && (
        <div className="text-center py-8">
          <Loader className="w-8 h-8 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Analyzing your financial data...</p>
        </div>
      )}

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-start">
          <AlertCircle className="w-5 h-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
          <p className="text-red-700">{error}</p>
        </div>
      )}

      {aiInsight && (
        <div className="space-y-6">
          {/* Health Score */}
          <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-lg p-6 text-center">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Savings Health Score</h3>
            <div className={`text-4xl font-bold mb-2 ${getHealthScoreColor(aiInsight.healthScore)}`}>
              {Math.round(aiInsight.healthScore)}/100
            </div>
            <p className={`text-lg font-medium ${getHealthScoreColor(aiInsight.healthScore)}`}>
              {getHealthScoreLabel(aiInsight.healthScore)}
            </p>
            <div className="w-full bg-gray-200 rounded-full h-3 mt-4">
              <div
                className="bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 h-3 rounded-full transition-all duration-500"
                style={{ width: `${aiInsight.healthScore}%` }}
              ></div>
            </div>
          </div>

          {/* Motivational Message */}
          <div className="bg-blue-50 rounded-lg p-4">
            <p className="text-blue-800">{aiInsight.motivationalMessage}</p>
          </div>

          {/* Savings Recommendations */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Savings Strategies</h3>
            <div className="space-y-2">
              {aiInsight.savingsRecommendations.strategies.map((strategy, index) => (
                <div key={index} className="flex items-start gap-2 p-3 bg-green-50 rounded-lg">
                  <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                    {index + 1}
                  </div>
                  <p className="text-green-800">{strategy}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Personalized Tips */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Personalized Tips</h3>
            <div className="space-y-2">
              {aiInsight.personalizedTips.map((tip, index) => (
                <div key={index} className="flex items-start gap-2 p-3 bg-blue-50 rounded-lg">
                  <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                    💡
                  </div>
                  <p className="text-blue-800">{tip}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Risk Assessment */}
          <div className="bg-yellow-50 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-yellow-800 mb-2">Risk Assessment</h3>
            <p className="text-yellow-700">{aiInsight.riskAssessment}</p>
          </div>

          {/* Emergency Fund Target */}
          <div className="bg-red-50 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-red-800 mb-2">Emergency Fund Goal</h3>
            <p className="text-red-700">
              Target: {formatCurrency(aiInsight.savingsRecommendations.emergencyFundTarget)} 
              (6 months of income)
            </p>
          </div>
          {/* Priority Areas */}
          {aiInsight.savingsRecommendations.priorityAreas.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Focus Areas</h3>
              <div className="flex flex-wrap gap-2">
                {aiInsight.savingsRecommendations.priorityAreas.map((area) => (
                  <span
                    key={area}
                    className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium capitalize"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Projections */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Monthly Savings Scenarios</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-gray-50 rounded-lg text-center">
                <h4 className="font-medium text-gray-600">Conservative</h4>
                <p className="text-2xl font-bold text-gray-800">
                  {formatCurrency(aiInsight.projections.conservative)}
                </p>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg text-center border-2 border-blue-200">
                <h4 className="font-medium text-blue-600">Current Plan</h4>
                <p className="text-2xl font-bold text-blue-600">
                  {formatCurrency(aiInsight.projections.moderate)}
                </p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg text-center">
                <h4 className="font-medium text-green-600">Aggressive</h4>
                <p className="text-2xl font-bold text-green-600">
                  {formatCurrency(aiInsight.projections.aggressive)}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};