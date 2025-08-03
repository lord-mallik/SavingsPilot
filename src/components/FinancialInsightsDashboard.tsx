import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Shield, Target, PiggyBank, AlertTriangle, CheckCircle, Info } from 'lucide-react';
import { motion } from 'framer-motion';
import { Line, Doughnut, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { FinancialData, UserProfile } from '../types';
import { formatINR, formatIndianNumber } from '../utils/currency';
import { useTheme } from '../contexts/ThemeContext';
import { useTranslation } from 'react-i18next';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface FinancialInsightsDashboardProps {
  financialData: FinancialData;
  userProfile: UserProfile;
}

interface InsightMetric {
  id: string;
  title: string;
  value: string;
  change: number;
  trend: 'up' | 'down' | 'neutral';
  status: 'excellent' | 'good' | 'warning' | 'critical';
  description: string;
  actionable: string;
}

export const FinancialInsightsDashboard: React.FC<FinancialInsightsDashboardProps> = ({
  financialData,
  userProfile,
}) => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const [selectedPeriod, setSelectedPeriod] = useState<'1M' | '3M' | '6M' | '1Y'>('3M');
  const [insights, setInsights] = useState<InsightMetric[]>([]);

  useEffect(() => {
    calculateInsights();
  }, [financialData, selectedPeriod]);

  const calculateInsights = () => {
    const totalExpenses = financialData.expenses.reduce((sum, exp) => sum + exp.amount, 0);
    const savingsRate = financialData.monthlyIncome > 0 
      ? ((financialData.monthlyIncome - totalExpenses) / financialData.monthlyIncome) * 100 
      : 0;
    
    const emergencyFundMonths = totalExpenses > 0 
      ? financialData.emergencyFund / totalExpenses 
      : 0;

    const newInsights: InsightMetric[] = [
      {
        id: 'income-expense-ratio',
        title: 'Income vs Expense Ratio',
        value: `${(100 - (totalExpenses / financialData.monthlyIncome) * 100).toFixed(1)}%`,
        change: savingsRate,
        trend: savingsRate > 20 ? 'up' : savingsRate > 10 ? 'neutral' : 'down',
        status: savingsRate > 20 ? 'excellent' : savingsRate > 15 ? 'good' : savingsRate > 10 ? 'warning' : 'critical',
        description: 'Percentage of income left after expenses',
        actionable: savingsRate < 20 ? 'Consider reducing discretionary spending' : 'Great job maintaining healthy savings!'
      },
      {
        id: 'emergency-fund-score',
        title: 'Emergency Fund Score',
        value: `${emergencyFundMonths.toFixed(1)} months`,
        change: emergencyFundMonths - 3,
        trend: emergencyFundMonths >= 6 ? 'up' : emergencyFundMonths >= 3 ? 'neutral' : 'down',
        status: emergencyFundMonths >= 6 ? 'excellent' : emergencyFundMonths >= 3 ? 'good' : emergencyFundMonths >= 1 ? 'warning' : 'critical',
        description: 'Months of expenses covered by emergency fund',
        actionable: emergencyFundMonths < 6 ? 'Build emergency fund to 6 months of expenses' : 'Emergency fund is well-funded!'
      },
      {
        id: 'savings-forecast',
        title: 'Monthly Savings Potential',
        value: formatINR(financialData.monthlyIncome - totalExpenses),
        change: 15.5,
        trend: 'up',
        status: savingsRate > 15 ? 'excellent' : 'good',
        description: 'Amount available for savings each month',
        actionable: 'Automate this amount to savings account'
      },
      {
        id: 'expense-efficiency',
        title: 'Expense Efficiency',
        value: `${((financialData.expenses.filter(e => e.type === 'needs').reduce((sum, e) => sum + e.amount, 0) / totalExpenses) * 100).toFixed(0)}%`,
        change: -5.2,
        trend: 'down',
        status: 'good',
        description: 'Percentage spent on essential needs',
        actionable: 'Optimal range is 50-60% for needs'
      }
    ];

    setInsights(newInsights);
  };

  const getStatusColor = (status: string) => {
    const colors = {
      excellent: theme === 'dark' ? 'text-green-400 bg-green-900/20' : 'text-green-600 bg-green-50',
      good: theme === 'dark' ? 'text-blue-400 bg-blue-900/20' : 'text-blue-600 bg-blue-50',
      warning: theme === 'dark' ? 'text-yellow-400 bg-yellow-900/20' : 'text-yellow-600 bg-yellow-50',
      critical: theme === 'dark' ? 'text-red-400 bg-red-900/20' : 'text-red-600 bg-red-50'
    };
    return colors[status as keyof typeof colors] || colors.good;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'excellent': return <CheckCircle className="w-5 h-5" />;
      case 'good': return <CheckCircle className="w-5 h-5" />;
      case 'warning': return <AlertTriangle className="w-5 h-5" />;
      case 'critical': return <AlertTriangle className="w-5 h-5" />;
      default: return <Info className="w-5 h-5" />;
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'down': return <TrendingDown className="w-4 h-4 text-red-500" />;
      default: return <div className="w-4 h-4 bg-gray-400 rounded-full" />;
    }
  };

  // Generate savings forecast chart data
  const generateForecastData = () => {
    const monthlySavings = financialData.monthlyIncome - financialData.expenses.reduce((sum, exp) => sum + exp.amount, 0);
    const months = Array.from({ length: 12 }, (_, i) => {
      const date = new Date();
      date.setMonth(date.getMonth() + i);
      return date.toLocaleDateString('en-IN', { month: 'short' });
    });

    const projectedSavings = months.map((_, index) => {
      return financialData.currentSavings + (monthlySavings * (index + 1));
    });

    return {
      labels: months,
      datasets: [
        {
          label: 'Projected Savings',
          data: projectedSavings,
          borderColor: theme === 'dark' ? '#60A5FA' : '#3B82F6',
          backgroundColor: theme === 'dark' ? 'rgba(96, 165, 250, 0.1)' : 'rgba(59, 130, 246, 0.1)',
          tension: 0.4,
          fill: true,
        },
      ],
    };
  };

  // Generate expense breakdown chart
  const generateExpenseBreakdown = () => {
    const expensesByType = {
      needs: financialData.expenses.filter(e => e.type === 'needs').reduce((sum, e) => sum + e.amount, 0),
      wants: financialData.expenses.filter(e => e.type === 'wants').reduce((sum, e) => sum + e.amount, 0),
      optional: financialData.expenses.filter(e => e.type === 'luxuries').reduce((sum, e) => sum + e.amount, 0),
    };

    return {
      labels: ['Needs', 'Wants', 'Optional'],
      datasets: [
        {
          data: [expensesByType.needs, expensesByType.wants, expensesByType.optional],
          backgroundColor: [
            theme === 'dark' ? '#EF4444' : '#DC2626',
            theme === 'dark' ? '#F59E0B' : '#D97706',
            theme === 'dark' ? '#3B82F6' : '#2563EB',
          ],
          borderWidth: 0,
        },
      ],
    };
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: theme === 'dark' ? '#1F2937' : '#FFFFFF',
        titleColor: theme === 'dark' ? '#F9FAFB' : '#111827',
        bodyColor: theme === 'dark' ? '#D1D5DB' : '#374151',
        borderColor: theme === 'dark' ? '#374151' : '#E5E7EB',
        borderWidth: 1,
        callbacks: {
          label: function(context: any) {
            return `₹${context.parsed.y?.toLocaleString('en-IN') || context.parsed?.toLocaleString('en-IN')}`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          color: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
        },
        ticks: {
          color: theme === 'dark' ? '#D1D5DB' : '#6B7280',
        },
      },
      y: {
        grid: {
          color: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
        },
        ticks: {
          color: theme === 'dark' ? '#D1D5DB' : '#6B7280',
          callback: function(value: any) {
            return formatIndianNumber(value);
          },
        },
      },
    },
  };

  return (
    <div className={`rounded-xl shadow-lg p-6 transition-colors duration-300 ${
      theme === 'dark' ? 'bg-gray-800' : 'bg-white'
    }`}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <TrendingUp className="w-8 h-8 text-blue-600" />
          <h2 className={`text-2xl font-bold ${
            theme === 'dark' ? 'text-white' : 'text-gray-800'
          }`}>
            Financial Insights Dashboard
          </h2>
        </div>
        
        {/* Period Selector */}
        <div className="flex gap-1 p-1 bg-gray-100 dark:bg-gray-700 rounded-lg">
          {(['1M', '3M', '6M', '1Y'] as const).map((period) => (
            <button
              key={period}
              onClick={() => setSelectedPeriod(period)}
              className={`px-3 py-1 text-sm font-medium rounded transition-colors ${
                selectedPeriod === period
                  ? 'bg-blue-600 text-white'
                  : theme === 'dark'
                    ? 'text-gray-300 hover:text-white'
                    : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              {period}
            </button>
          ))}
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {insights.map((insight, index) => (
          <motion.div
            key={insight.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`p-4 rounded-lg border transition-colors ${getStatusColor(insight.status)}`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                {getStatusIcon(insight.status)}
                <h3 className="font-medium text-sm">{insight.title}</h3>
              </div>
              {getTrendIcon(insight.trend)}
            </div>
            
            <div className="mb-2">
              <p className="text-2xl font-bold">{insight.value}</p>
              <p className="text-xs opacity-75">{insight.description}</p>
            </div>
            
            <div className={`text-xs p-2 rounded ${
              theme === 'dark' ? 'bg-gray-800/50' : 'bg-white/50'
            }`}>
              <p className="font-medium">💡 {insight.actionable}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Savings Forecast */}
        <div className={`p-4 rounded-lg ${
          theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'
        }`}>
          <h3 className={`text-lg font-semibold mb-4 ${
            theme === 'dark' ? 'text-white' : 'text-gray-800'
          }`}>
            12-Month Savings Forecast
          </h3>
          <div className="h-64">
            <Line data={generateForecastData()} options={chartOptions} />
          </div>
        </div>

        {/* Expense Breakdown */}
        <div className={`p-4 rounded-lg ${
          theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'
        }`}>
          <h3 className={`text-lg font-semibold mb-4 ${
            theme === 'dark' ? 'text-white' : 'text-gray-800'
          }`}>
            Expense Distribution
          </h3>
          <div className="h-64">
            <Doughnut data={generateExpenseBreakdown()} options={chartOptions} />
          </div>
        </div>
      </div>

      {/* Monthly Summary */}
      <div className={`p-6 rounded-lg ${
        theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'
      }`}>
        <h3 className={`text-lg font-semibold mb-4 ${
          theme === 'dark' ? 'text-white' : 'text-gray-800'
        }`}>
          Monthly Financial Summary
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <PiggyBank className="w-6 h-6 text-green-600" />
              <span className={`font-medium ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Total Income
              </span>
            </div>
            <p className={`text-3xl font-bold ${
              theme === 'dark' ? 'text-green-400' : 'text-green-600'
            }`}>
              {formatINR(financialData.monthlyIncome)}
            </p>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Target className="w-6 h-6 text-red-600" />
              <span className={`font-medium ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Total Expenses
              </span>
            </div>
            <p className={`text-3xl font-bold ${
              theme === 'dark' ? 'text-red-400' : 'text-red-600'
            }`}>
              {formatINR(financialData.expenses.reduce((sum, exp) => sum + exp.amount, 0))}
            </p>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Shield className="w-6 h-6 text-blue-600" />
              <span className={`font-medium ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Net Savings
              </span>
            </div>
            <p className={`text-3xl font-bold ${
              (financialData.monthlyIncome - financialData.expenses.reduce((sum, exp) => sum + exp.amount, 0)) >= 0
                ? theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
                : theme === 'dark' ? 'text-red-400' : 'text-red-600'
            }`}>
              {formatINR(financialData.monthlyIncome - financialData.expenses.reduce((sum, exp) => sum + exp.amount, 0))}
            </p>
          </div>
        </div>

        {/* Financial Health Score */}
        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-600">
          <div className="flex items-center justify-between mb-3">
            <h4 className={`font-semibold ${
              theme === 'dark' ? 'text-white' : 'text-gray-800'
            }`}>
              Overall Financial Health
            </h4>
            <span className={`text-2xl font-bold ${
              insights[0]?.status === 'excellent' ? 'text-green-600' :
              insights[0]?.status === 'good' ? 'text-blue-600' :
              insights[0]?.status === 'warning' ? 'text-yellow-600' : 'text-red-600'
            }`}>
              {Math.round((insights.reduce((sum, insight) => {
                const score = insight.status === 'excellent' ? 100 : 
                             insight.status === 'good' ? 80 : 
                             insight.status === 'warning' ? 60 : 40;
                return sum + score;
              }, 0) / insights.length))}%
            </span>
          </div>
          
          <div className={`w-full rounded-full h-3 ${
            theme === 'dark' ? 'bg-gray-600' : 'bg-gray-200'
          }`}>
            <motion.div
              initial={{ width: 0 }}
              animate={{ 
                width: `${Math.round((insights.reduce((sum, insight) => {
                  const score = insight.status === 'excellent' ? 100 : 
                               insight.status === 'good' ? 80 : 
                               insight.status === 'warning' ? 60 : 40;
                  return sum + score;
                }, 0) / insights.length))}%` 
              }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 h-3 rounded-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};