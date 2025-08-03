import React, { useState } from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Pie, Bar, Line, Doughnut, Radar } from 'react-chartjs-2';
import { BarChart3, PieChart, LineChart, Download, Filter } from 'lucide-react';
import { motion } from 'framer-motion';
import { Expense } from '../types';
import { categorizeExpenses } from '../utils/calculations';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend
);

interface EnhancedExpenseChartProps {
  expenses: Expense[];
}

type ChartType = 'pie' | 'bar' | 'line' | 'doughnut' | 'radar';

export const EnhancedExpenseChart: React.FC<EnhancedExpenseChartProps> = ({ expenses }) => {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const [activeChart, setActiveChart] = useState<ChartType>('pie');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState<string[]>(['needs', 'wants', 'optional']);

  const categorizedExpenses = categorizeExpenses(expenses);
  
  // Filter expenses based on selected types
  const filteredExpenses = expenses.filter(expense => selectedTypes.includes(expense.type));
  
  // Calculate totals by type
  const typeData = {
    needs: categorizedExpenses.needs?.reduce((sum, exp) => sum + exp.amount, 0) || 0,
    wants: categorizedExpenses.wants?.reduce((sum, exp) => sum + exp.amount, 0) || 0,
    optional: categorizedExpenses.optional?.reduce((sum, exp) => sum + exp.amount, 0) || 0,
  };

  // Calculate totals by category for filtered expenses
  const categoryData = filteredExpenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {} as { [key: string]: number });

  const chartColors = theme === 'dark' 
    ? {
        needs: 'rgba(239, 68, 68, 0.8)',
        wants: 'rgba(245, 158, 11, 0.8)',
        optional: 'rgba(59, 130, 246, 0.8)',
        background: '#1f2937',
        text: '#f9fafb'
      }
    : {
        needs: 'rgba(239, 68, 68, 0.8)',
        wants: 'rgba(245, 158, 11, 0.8)',
        optional: 'rgba(59, 130, 246, 0.8)',
        background: '#ffffff',
        text: '#1f2937'
      };

  const pieData = {
    labels: [t('analysis.needs'), t('analysis.wants'), t('analysis.optional')],
    datasets: [
      {
        data: [typeData.needs, typeData.wants, typeData.optional],
        backgroundColor: [
          chartColors.needs,
          chartColors.wants,
          chartColors.optional,
        ],
        borderColor: [
          chartColors.needs.replace('0.8', '1'),
          chartColors.wants.replace('0.8', '1'),
          chartColors.optional.replace('0.8', '1'),
        ],
        borderWidth: 2,
      },
    ],
  };

  const barData = {
    labels: Object.keys(categoryData).map(cat => 
      cat.charAt(0).toUpperCase() + cat.slice(1)
    ),
    datasets: [
      {
        label: 'Amount ($)',
        data: Object.values(categoryData),
        backgroundColor: 'rgba(16, 185, 129, 0.8)',
        borderColor: 'rgba(16, 185, 129, 1)',
        borderWidth: 1,
      },
    ],
  };

  const lineData = {
    labels: Object.keys(categoryData).map(cat => 
      cat.charAt(0).toUpperCase() + cat.slice(1)
    ),
    datasets: [
      {
        label: 'Spending Trend',
        data: Object.values(categoryData),
        borderColor: 'rgba(59, 130, 246, 1)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const radarData = {
    labels: Object.keys(categoryData).map(cat => 
      cat.charAt(0).toUpperCase() + cat.slice(1)
    ),
    datasets: [
      {
        label: 'Expense Distribution',
        data: Object.values(categoryData),
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(59, 130, 246, 1)',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          padding: 20,
          usePointStyle: true,
          color: chartColors.text,
        },
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            const value = context.parsed || context.parsed.y;
            return `$${value.toLocaleString()}`;
          },
        },
      },
    },
    scales: activeChart === 'bar' || activeChart === 'line' ? {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value: any) {
            return '$' + value.toLocaleString();
          },
          color: chartColors.text,
        },
        grid: {
          color: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
        },
      },
      x: {
        ticks: {
          color: chartColors.text,
        },
        grid: {
          color: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
        },
      },
    } : undefined,
  };

  const radarOptions = {
    ...chartOptions,
    scales: {
      r: {
        beginAtZero: true,
        ticks: {
          color: chartColors.text,
        },
        grid: {
          color: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
        },
        angleLines: {
          color: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
        },
      },
    },
  };

  const chartTypes = [
    { type: 'pie' as ChartType, icon: PieChart, label: 'Pie Chart' },
    { type: 'bar' as ChartType, icon: BarChart3, label: 'Bar Chart' },
    { type: 'line' as ChartType, icon: LineChart, label: 'Line Chart' },
    { type: 'doughnut' as ChartType, icon: PieChart, label: 'Doughnut' },
    { type: 'radar' as ChartType, icon: BarChart3, label: 'Radar' },
  ];

  const exportChart = () => {
    const canvas = document.querySelector('canvas');
    if (canvas) {
      const url = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `expense-chart-${activeChart}-${new Date().toISOString().split('T')[0]}.png`;
      link.href = url;
      link.click();
    }
  };

  const toggleTypeFilter = (type: string) => {
    setSelectedTypes(prev => 
      prev.includes(type) 
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  const renderChart = () => {
    const chartData = activeChart === 'pie' || activeChart === 'doughnut' ? pieData :
                     activeChart === 'bar' ? barData :
                     activeChart === 'line' ? lineData :
                     radarData;

    const options = activeChart === 'radar' ? radarOptions : chartOptions;

    switch (activeChart) {
      case 'pie':
        return <Pie data={chartData} options={options} />;
      case 'bar':
        return <Bar data={chartData} options={options} />;
      case 'line':
        return <Line data={chartData} options={options} />;
      case 'doughnut':
        return <Doughnut data={chartData} options={options} />;
      case 'radar':
        return <Radar data={chartData} options={options} />;
      default:
        return <Pie data={chartData} options={options} />;
    }
  };

  if (expenses.length === 0) {
    return (
      <div className={`rounded-xl shadow-lg p-6 transition-colors duration-300 ${
        theme === 'dark' ? 'bg-gray-800' : 'bg-white'
      }`}>
        <h2 className={`text-2xl font-bold mb-6 ${
          theme === 'dark' ? 'text-white' : 'text-gray-800'
        }`}>
          {t('analysis.title')}
        </h2>
        <div className={`flex items-center justify-center h-64 ${
          theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
        }`}>
          <p>Add expenses to see your spending analysis</p>
        </div>
      </div>
    );
  }

  const totalAmount = expenses.reduce((sum, exp) => sum + exp.amount, 0);

  return (
    <div className={`rounded-xl shadow-lg p-6 transition-colors duration-300 ${
      theme === 'dark' ? 'bg-gray-800' : 'bg-white'
    }`}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
        <h2 className={`text-2xl font-bold ${
          theme === 'dark' ? 'text-white' : 'text-gray-800'
        }`}>
          {t('analysis.title')}
        </h2>
        
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
              theme === 'dark'
                ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Filter className="w-4 h-4" />
            Filters
          </button>
          
          <button
            onClick={exportChart}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
              theme === 'dark'
                ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      {/* Chart Type Selector */}
      <div className="flex flex-wrap gap-2 mb-6">
        {chartTypes.map(({ type, icon: Icon, label }) => (
          <motion.button
            key={type}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveChart(type)}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeChart === type
                ? 'bg-blue-600 text-white'
                : theme === 'dark'
                  ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Icon className="w-4 h-4" />
            {label}
          </motion.button>
        ))}
      </div>

      {/* Filters */}
      {showFilters && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className={`mb-6 p-4 rounded-lg ${
            theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'
          }`}
        >
          <h3 className={`text-sm font-medium mb-3 ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
          }`}>
            Filter by Type:
          </h3>
          <div className="flex flex-wrap gap-2">
            {[
              { key: 'needs', label: t('analysis.needs'), color: 'red' },
              { key: 'wants', label: t('analysis.wants'), color: 'yellow' },
              { key: 'optional', label: t('analysis.optional'), color: 'blue' },
            ].map(({ key, label, color }) => (
              <button
                key={key}
                onClick={() => toggleTypeFilter(key)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  selectedTypes.includes(key)
                    ? `bg-${color}-100 text-${color}-800 border-2 border-${color}-300`
                    : theme === 'dark'
                      ? 'bg-gray-600 text-gray-300 hover:bg-gray-500'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </motion.div>
      )}
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className={`p-4 rounded-lg border-l-4 border-red-500 ${
            theme === 'dark' ? 'bg-red-900/20' : 'bg-red-50'
          }`}
        >
          <h3 className={`font-semibold ${
            theme === 'dark' ? 'text-red-400' : 'text-red-800'
          }`}>
            {t('analysis.needs')}
          </h3>
          <p className={`text-2xl font-bold ${
            theme === 'dark' ? 'text-red-300' : 'text-red-600'
          }`}>
            ${typeData.needs.toLocaleString()}
          </p>
          <p className={`text-sm ${
            theme === 'dark' ? 'text-red-400' : 'text-red-600'
          }`}>
            {totalAmount > 0 ? ((typeData.needs / totalAmount) * 100).toFixed(1) : 0}% of total
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className={`p-4 rounded-lg border-l-4 border-yellow-500 ${
            theme === 'dark' ? 'bg-yellow-900/20' : 'bg-yellow-50'
          }`}
        >
          <h3 className={`font-semibold ${
            theme === 'dark' ? 'text-yellow-400' : 'text-yellow-800'
          }`}>
            {t('analysis.wants')}
          </h3>
          <p className={`text-2xl font-bold ${
            theme === 'dark' ? 'text-yellow-300' : 'text-yellow-600'
          }`}>
            ${typeData.wants.toLocaleString()}
          </p>
          <p className={`text-sm ${
            theme === 'dark' ? 'text-yellow-400' : 'text-yellow-600'
          }`}>
            {totalAmount > 0 ? ((typeData.wants / totalAmount) * 100).toFixed(1) : 0}% of total
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className={`p-4 rounded-lg border-l-4 border-blue-500 ${
            theme === 'dark' ? 'bg-blue-900/20' : 'bg-blue-50'
          }`}
        >
          <h3 className={`font-semibold ${
            theme === 'dark' ? 'text-blue-400' : 'text-blue-800'
          }`}>
            {t('analysis.optional')}
          </h3>
          <p className={`text-2xl font-bold ${
            theme === 'dark' ? 'text-blue-300' : 'text-blue-600'
          }`}>
            ${typeData.optional.toLocaleString()}
          </p>
          <p className={`text-sm ${
            theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
          }`}>
            {totalAmount > 0 ? ((typeData.optional / totalAmount) * 100).toFixed(1) : 0}% of total
          </p>
        </motion.div>
      </div>

      {/* Chart */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4 }}
        className="h-96"
      >
        {renderChart()}
      </motion.div>
    </div>
  );
};