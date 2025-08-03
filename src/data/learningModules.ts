import { LearningModule } from '../types';

export const LEARNING_MODULES: LearningModule[] = [
  {
    id: 'budgeting-basics',
    title: 'Budgeting Fundamentals',
    description: 'Learn the 50/30/20 rule and basic budgeting principles',
    category: 'budgeting',
    difficulty: 'beginner',
    estimatedTime: 15,
    completed: false,
    scenarios: [
      {
        id: 'scenario-1',
        title: 'Monthly Budget Allocation',
        situation: 'You earn $4,000 per month. According to the 50/30/20 rule, how should you allocate your income?',
        options: [
          {
            id: 'a',
            text: '$2,000 needs, $1,200 wants, $800 savings',
            outcome: 'Perfect! This follows the 50/30/20 rule exactly.',
            isCorrect: true
          },
          {
            id: 'b',
            text: '$2,500 needs, $1,000 wants, $500 savings',
            outcome: 'This allocates too much to needs and too little to savings.',
            isCorrect: false
          },
          {
            id: 'c',
            text: '$1,500 needs, $1,500 wants, $1,000 savings',
            outcome: 'While saving more is good, this may not be realistic for most people.',
            isCorrect: false
          }
        ],
        correctAnswer: 'a',
        explanation: 'The 50/30/20 rule suggests allocating 50% to needs, 30% to wants, and 20% to savings and debt repayment.'
      }
    ]
  },
  {
    id: 'emergency-fund',
    title: 'Building Your Emergency Fund',
    description: 'Understand why emergency funds matter and how to build one',
    category: 'emergency',
    difficulty: 'beginner',
    estimatedTime: 20,
    completed: false,
    scenarios: [
      {
        id: 'scenario-1',
        title: 'Emergency Fund Size',
        situation: 'Your monthly expenses are $3,000. What should be your emergency fund target?',
        options: [
          {
            id: 'a',
            text: '$3,000 (1 month)',
            outcome: 'This is a good start, but most experts recommend more.',
            isCorrect: false
          },
          {
            id: 'b',
            text: '$9,000 (3 months)',
            outcome: 'Excellent! 3-6 months of expenses is the standard recommendation.',
            isCorrect: true
          },
          {
            id: 'c',
            text: '$18,000 (6 months)',
            outcome: 'This is also correct and provides extra security!',
            isCorrect: true
          }
        ],
        correctAnswer: 'b',
        explanation: 'Most financial experts recommend 3-6 months of living expenses in an emergency fund.'
      }
    ]
  },
  {
    id: 'compound-interest',
    title: 'The Power of Compound Interest',
    description: 'Discover how compound interest can accelerate your wealth building',
    category: 'investing',
    difficulty: 'intermediate',
    estimatedTime: 25,
    completed: false,
    scenarios: [
      {
        id: 'scenario-1',
        title: 'Starting Early vs. Starting Late',
        situation: 'Person A starts investing $200/month at age 25. Person B starts investing $400/month at age 35. Both earn 8% annually and retire at 65. Who has more money?',
        options: [
          {
            id: 'a',
            text: 'Person A (started earlier with less)',
            outcome: 'Correct! Starting early gives compound interest more time to work.',
            isCorrect: true
          },
          {
            id: 'b',
            text: 'Person B (invested more per month)',
            outcome: 'Actually, Person A comes out ahead due to the power of time.',
            isCorrect: false
          },
          {
            id: 'c',
            text: 'They end up with roughly the same amount',
            outcome: 'No, the difference is quite significant in favor of Person A.',
            isCorrect: false
          }
        ],
        correctAnswer: 'a',
        explanation: 'Person A invests for 40 years vs Person B\'s 30 years. The extra 10 years of compound growth makes a huge difference!'
      }
    ]
  },
  {
    id: 'debt-management',
    title: 'Smart Debt Management',
    description: 'Learn strategies for paying off debt efficiently',
    category: 'debt',
    difficulty: 'intermediate',
    estimatedTime: 30,
    completed: false,
    scenarios: [
      {
        id: 'scenario-1',
        title: 'Debt Payoff Strategy',
        situation: 'You have three debts: Credit Card A (22% APR, $2,000), Credit Card B (18% APR, $5,000), and Student Loan (6% APR, $10,000). Which should you pay off first?',
        options: [
          {
            id: 'a',
            text: 'Credit Card A (highest interest rate)',
            outcome: 'Correct! This is the avalanche method - pay highest interest first.',
            isCorrect: true
          },
          {
            id: 'b',
            text: 'Credit Card A (smallest balance)',
            outcome: 'This is the snowball method, which can work for motivation but costs more in interest.',
            isCorrect: false
          },
          {
            id: 'c',
            text: 'Student Loan (largest balance)',
            outcome: 'This is usually not optimal since student loans typically have lower interest rates.',
            isCorrect: false
          }
        ],
        correctAnswer: 'a',
        explanation: 'The debt avalanche method (paying highest interest rate first) saves the most money in interest payments.'
      }
    ]
  }
];

export const getModulesByDifficulty = (difficulty: 'beginner' | 'intermediate' | 'advanced'): LearningModule[] => {
  return LEARNING_MODULES.filter(module => module.difficulty === difficulty);
};

export const getModulesByCategory = (category: string): LearningModule[] => {
  return LEARNING_MODULES.filter(module => module.category === category);
};