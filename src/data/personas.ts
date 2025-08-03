import { PersonaType, Expense } from '../types';

export const PERSONAS: PersonaType[] = [
  {
    id: 'student',
    name: 'College Student',
    description: 'Managing finances on a tight budget while studying',
    icon: '🎓',
    defaultIncome: 1500,
    savingsTarget: 200,
    riskTolerance: 'low',
    defaultExpenses: [
      { id: '1', category: 'rent', amount: 600, description: 'Shared apartment', type: 'needs' },
      { id: '2', category: 'groceries', amount: 200, description: 'Basic groceries', type: 'needs' },
      { id: '3', category: 'transportation', amount: 80, description: 'Public transport', type: 'needs' },
      { id: '4', category: 'textbooks', amount: 100, description: 'Course materials', type: 'needs' },
      { id: '5', category: 'dining', amount: 150, description: 'Eating out', type: 'wants' },
      { id: '6', category: 'entertainment', amount: 100, description: 'Movies, games', type: 'wants' },
      { id: '7', category: 'subscriptions', amount: 25, description: 'Streaming services', type: 'luxuries' },
    ]
  },
  {
    id: 'freelancer',
    name: 'Freelancer',
    description: 'Variable income with irregular cash flow',
    icon: '💻',
    defaultIncome: 3500,
    savingsTarget: 700,
    riskTolerance: 'medium',
    defaultExpenses: [
      { id: '1', category: 'rent', amount: 1200, description: 'Home office rent', type: 'needs' },
      { id: '2', category: 'utilities', amount: 150, description: 'Internet, electricity', type: 'needs' },
      { id: '3', category: 'groceries', amount: 300, description: 'Weekly shopping', type: 'needs' },
      { id: '4', category: 'insurance', amount: 200, description: 'Health insurance', type: 'needs' },
      { id: '5', category: 'business', amount: 250, description: 'Software, tools', type: 'needs' },
      { id: '6', category: 'dining', amount: 200, description: 'Client meetings', type: 'wants' },
      { id: '7', category: 'coworking', amount: 150, description: 'Coworking space', type: 'wants' },
      { id: '8', category: 'courses', amount: 100, description: 'Skill development', type: 'luxuries' },
    ]
  },
  {
    id: 'working-parent',
    name: 'Working Parent',
    description: 'Balancing family expenses with career growth',
    icon: '👨‍👩‍👧‍👦',
    defaultIncome: 5500,
    savingsTarget: 800,
    riskTolerance: 'medium',
    defaultExpenses: [
      { id: '1', category: 'rent', amount: 1800, description: 'Family home', type: 'needs' },
      { id: '2', category: 'utilities', amount: 200, description: 'All utilities', type: 'needs' },
      { id: '3', category: 'groceries', amount: 600, description: 'Family groceries', type: 'needs' },
      { id: '4', category: 'childcare', amount: 800, description: 'Daycare/babysitter', type: 'needs' },
      { id: '5', category: 'insurance', amount: 400, description: 'Family insurance', type: 'needs' },
      { id: '6', category: 'transportation', amount: 300, description: 'Car payments/gas', type: 'needs' },
      { id: '7', category: 'education', amount: 200, description: 'Kids activities', type: 'wants' },
      { id: '8', category: 'dining', amount: 250, description: 'Family dining out', type: 'wants' },
      { id: '9', category: 'entertainment', amount: 150, description: 'Family activities', type: 'wants' },
      { id: '10', category: 'subscriptions', amount: 50, description: 'Streaming, apps', type: 'luxuries' },
    ]
  },
  {
    id: 'young-professional',
    name: 'Young Professional',
    description: 'Early career with growth potential',
    icon: '💼',
    defaultIncome: 4200,
    savingsTarget: 840,
    riskTolerance: 'high',
    defaultExpenses: [
      { id: '1', category: 'rent', amount: 1400, description: 'City apartment', type: 'needs' },
      { id: '2', category: 'utilities', amount: 120, description: 'Basic utilities', type: 'needs' },
      { id: '3', category: 'groceries', amount: 350, description: 'Weekly shopping', type: 'needs' },
      { id: '4', category: 'transportation', amount: 200, description: 'Public transport', type: 'needs' },
      { id: '5', category: 'insurance', amount: 180, description: 'Health insurance', type: 'needs' },
      { id: '6', category: 'dining', amount: 400, description: 'Restaurants', type: 'wants' },
      { id: '7', category: 'entertainment', amount: 200, description: 'Social activities', type: 'wants' },
      { id: '8', category: 'shopping', amount: 300, description: 'Clothes, gadgets', type: 'wants' },
      { id: '9', category: 'gym', amount: 80, description: 'Fitness membership', type: 'wants' },
      { id: '10', category: 'subscriptions', amount: 75, description: 'Various apps', type: 'luxuries' },
      { id: '11', category: 'travel', amount: 200, description: 'Weekend trips', type: 'luxuries' },
    ]
  },
  {
    id: 'retiree',
    name: 'Retiree',
    description: 'Fixed income with focus on preservation',
    icon: '🏖️',
    defaultIncome: 3200,
    savingsTarget: 320,
    riskTolerance: 'low',
    defaultExpenses: [
      { id: '1', category: 'housing', amount: 1000, description: 'Mortgage/rent', type: 'needs' },
      { id: '2', category: 'utilities', amount: 150, description: 'All utilities', type: 'needs' },
      { id: '3', category: 'groceries', amount: 300, description: 'Weekly shopping', type: 'needs' },
      { id: '4', category: 'healthcare', amount: 400, description: 'Medical expenses', type: 'needs' },
      { id: '5', category: 'insurance', amount: 200, description: 'Supplemental insurance', type: 'needs' },
      { id: '6', category: 'transportation', amount: 150, description: 'Car maintenance', type: 'needs' },
      { id: '7', category: 'dining', amount: 200, description: 'Occasional dining', type: 'wants' },
      { id: '8', category: 'hobbies', amount: 150, description: 'Leisure activities', type: 'wants' },
      { id: '9', category: 'travel', amount: 250, description: 'Vacation fund', type: 'luxuries' },
    ]
  }
];

export const getPersonaById = (id: string): PersonaType | undefined => {
  return PERSONAS.find(persona => persona.id === id);
};

export const getDefaultPersona = (): PersonaType => {
  return PERSONAS[0]; // Student as default
};