import React, { useState } from 'react';
import { PiggyBank, TrendingUp, Calculator, Brain, User, Zap } from 'lucide-react';
import { ExpenseInput } from './components/ExpenseInput';
import { ExpenseChart } from './components/ExpenseChart';
import { SavingsSimulator } from './components/SavingsSimulator';
import { AICoach } from './components/AICoach';
import { PersonaSelector } from './components/PersonaSelector';
import { UserProfile } from './components/UserProfile';
import { Gamification } from './components/Gamification';
import { Expense, FinancialData, SavingsScenario, UserProfile as UserProfileType, PersonaType } from './types';
import { getDefaultPersona } from './data/personas';
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [showPersonaSelector, setShowPersonaSelector] = useState(true);
  const [userProfile, setUserProfile] = useState<UserProfileType>({
    id: uuidv4(),
    name: 'Financial Explorer',
    persona: getDefaultPersona(),
    level: 1,
    experience: 0,
    badges: [],
    streakDays: 0,
    totalSaved: 0,
    goals: [],
    preferences: {
      currency: 'USD',
      notifications: true,
      theme: 'light',
      riskTolerance: 'moderate',
      coachingStyle: 'motivational'
    }
  });
  
  const [financialData, setFinancialData] = useState<FinancialData>({
    monthlyIncome: 0,
    expenses: [],
    emergencyFund: 0,
    currentSavings: 0,
  });
  
  const [savingsScenario, setSavingsScenario] = useState<SavingsScenario>({
    diningReduction: 0,
    entertainmentReduction: 0,
    shoppingReduction: 0,
    subscriptionReduction: 0,
    transportationReduction: 0,
    luxuryReduction: 0,
  });

  const [activeTab, setActiveTab] = useState<'profile' | 'input' | 'analysis' | 'simulator' | 'coach' | 'gamification'>('profile');

  const handlePersonaSelect = (persona: PersonaType) => {
    setUserProfile(prev => ({ ...prev, persona }));
    setFinancialData(prev => ({
      ...prev,
      monthlyIncome: persona.defaultIncome,
      expenses: persona.defaultExpenses
    }));
    setShowPersonaSelector(false);
  };

  const handleSkipPersona = () => {
    setShowPersonaSelector(false);
  };

  const handleUpdateProfile = (updates: Partial<UserProfileType>) => {
    setUserProfile(prev => ({ ...prev, ...updates }));
  };
  const handleExpensesChange = (expenses: Expense[]) => {
    setFinancialData(prev => ({ ...prev, expenses }));
  };

  const handleIncomeChange = (monthlyIncome: number) => {
    setFinancialData(prev => ({ ...prev, monthlyIncome }));
  };

  const handleEmergencyFundChange = (emergencyFund: number) => {
    setFinancialData(prev => ({ ...prev, emergencyFund }));
  };

  const handleCurrentSavingsChange = (currentSavings: number) => {
    setFinancialData(prev => ({ ...prev, currentSavings }));
  };
  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'input', label: 'Financial Data', icon: Calculator },
    { id: 'analysis', label: 'Analysis', icon: TrendingUp },
    { id: 'simulator', label: 'Simulator', icon: PiggyBank },
    { id: 'coach', label: 'AI Coach', icon: Brain },
    { id: 'gamification', label: 'Challenges', icon: Zap },
  ];

  if (showPersonaSelector) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center p-4">
        <div className="max-w-4xl w-full">
          <PersonaSelector
            selectedPersona={userProfile.persona}
            onPersonaSelect={handlePersonaSelect}
            onSkip={handleSkipPersona}
          />
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Header */}
      <header className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-3">
            <PiggyBank className="w-10 h-10 text-blue-600" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Savings Simulator AI - Pro Edition</h1>
              <p className="text-gray-600">Your Intelligent Financial Coaching Platform</p>
            </div>
            <div className="ml-auto flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm text-gray-600">Welcome back,</p>
                <p className="font-semibold text-gray-800">{userProfile.name}</p>
              </div>
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center text-white font-bold">
                {userProfile.name.charAt(0).toUpperCase()}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-1 overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600 bg-blue-50'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'profile' && (
          <UserProfile
            userProfile={userProfile}
            onEditProfile={() => setShowPersonaSelector(true)}
          />
        )}

        {activeTab === 'input' && (
          <div className="space-y-6">
            <ExpenseInput
              expenses={financialData.expenses}
              onExpensesChange={handleExpensesChange}
              monthlyIncome={financialData.monthlyIncome}
              onIncomeChange={handleIncomeChange}
            />
            
            {/* Additional Financial Data */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Additional Financial Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Emergency Fund
                  </label>
                  <input
                    type="number"
                    value={financialData.emergencyFund || ''}
                    onChange={(e) => handleEmergencyFundChange(parseFloat(e.target.value) || 0)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Current emergency fund amount"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Current Savings
                  </label>
                  <input
                    type="number"
                    value={financialData.currentSavings || ''}
                    onChange={(e) => handleCurrentSavingsChange(parseFloat(e.target.value) || 0)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Total current savings"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'analysis' && (
          <ExpenseChart expenses={financialData.expenses} />
        )}

        {activeTab === 'simulator' && (
          <SavingsSimulator
            expenses={financialData.expenses}
            onScenarioChange={setSavingsScenario}
          />
        )}

        {activeTab === 'coach' && (
          <AICoach
            financialData={financialData}
            savingsScenario={savingsScenario}
          />
        )}

        {activeTab === 'gamification' && (
          <Gamification
            userProfile={userProfile}
            onUpdateProfile={handleUpdateProfile}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <p>&copy; 2025 Savings Simulator AI - Pro Edition. Built with React, TypeScript, and Chart.js.</p>
            <p className="mt-2 text-sm">
              Empowering your financial journey through AI-powered coaching, gamification, and personalized insights.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;