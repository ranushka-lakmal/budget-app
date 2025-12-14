import { Budget, Transaction, UserPrefs, AuthState } from '../types';

export const seedBudgets: Budget[] = [
  {
    id: 'groceries',
    title: 'Groceries',
    category: 'Food & Dining',
    limit: 500,
    spent: 150,
    alertThreshold: 0.8,
    color: '#2563EB',
  },
  {
    id: 'transport',
    title: 'Transport',
    category: 'Commute',
    limit: 200,
    spent: 120,
    alertThreshold: 0.75,
    color: '#F97316',
  },
  {
    id: 'entertainment',
    title: 'Entertainment',
    category: 'Fun',
    limit: 150,
    spent: 110,
    alertThreshold: 0.7,
    color: '#EF4444',
  },
];

export const seedTransactions: Transaction[] = [
  {
    id: 't-1',
    title: 'Starbucks Coffee',
    amount: -5.5,
    category: 'Food & Dining',
    date: new Date().toISOString(),
    account: 'Visa •• 4242',
  },
  {
    id: 't-2',
    title: 'Freelance Payment',
    amount: 850,
    category: 'Income',
    date: new Date().toISOString(),
    account: 'Checking',
  },
  {
    id: 't-3',
    title: 'Netflix Standard',
    amount: -15.99,
    category: 'Subscription',
    date: new Date(Date.now() - 86400000).toISOString(),
    account: 'Visa •• 4242',
  },
];

export const seedPrefs: UserPrefs = {
  currency: 'USD',
  darkMode: false,
  startOfWeek: 'Monday',
  billReminders: true,
  budgetAlerts: true,
  faceIdEnabled: false,
};

export const seedUser: AuthState = {
  email: 'demo@budgetmate.app',
  name: 'Demo User',
  password: 'password123',
};
