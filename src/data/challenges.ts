import { Challenge } from '../types';

export const MONTHLY_CHALLENGES: Challenge[] = [
  {
    id: 'no-dining-week',
    title: 'Cook at Home Challenge',
    description: 'Cook all meals at home for 7 days straight',
    target: 7,
    category: 'dining',
    duration: 7,
    reward: {
      id: 'home-chef',
      name: 'Home Chef',
      description: 'Cooked at home for a full week',
      icon: '👨‍🍳',
      unlockedAt: new Date(),
      category: 'milestone'
    },
    isActive: false,
    progress: 0
  },
  {
    id: 'subscription-audit',
    title: 'Subscription Detox',
    description: 'Cancel at least 3 unused subscriptions',
    target: 3,
    category: 'subscriptions',
    duration: 30,
    reward: {
      id: 'subscription-slayer',
      name: 'Subscription Slayer',
      description: 'Eliminated unnecessary subscriptions',
      icon: '✂️',
      unlockedAt: new Date(),
      category: 'savings'
    },
    isActive: false,
    progress: 0
  },
  {
    id: 'coffee-savings',
    title: 'Brew Your Own',
    description: 'Make coffee at home instead of buying for 2 weeks',
    target: 14,
    category: 'dining',
    duration: 14,
    reward: {
      id: 'barista-badge',
      name: 'Home Barista',
      description: 'Saved money by brewing at home',
      icon: '☕',
      unlockedAt: new Date(),
      category: 'savings'
    },
    isActive: false,
    progress: 0
  },
  {
    id: 'emergency-fund-boost',
    title: 'Emergency Fund Sprint',
    description: 'Add $500 to your emergency fund this month',
    target: 500,
    category: 'savings',
    duration: 30,
    reward: {
      id: 'emergency-booster',
      name: 'Emergency Booster',
      description: 'Boosted emergency fund significantly',
      icon: '🚀',
      unlockedAt: new Date(),
      category: 'milestone'
    },
    isActive: false,
    progress: 0
  },
  {
    id: 'no-impulse-buy',
    title: 'Mindful Spending',
    description: 'Wait 24 hours before any non-essential purchase over $50',
    target: 10,
    category: 'shopping',
    duration: 30,
    reward: {
      id: 'mindful-spender',
      name: 'Mindful Spender',
      description: 'Practiced thoughtful purchasing decisions',
      icon: '🧘',
      unlockedAt: new Date(),
      category: 'milestone'
    },
    isActive: false,
    progress: 0
  }
];

export const getActiveChallenges = (challenges: Challenge[]): Challenge[] => {
  return challenges.filter(challenge => challenge.isActive);
};

export const getCompletedChallenges = (challenges: Challenge[]): Challenge[] => {
  return challenges.filter(challenge => challenge.progress >= challenge.target);
};