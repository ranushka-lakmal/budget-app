export type CurrencyCode = 'USD' | 'EUR' | 'GBP';

export type Budget = {
  id: string;
  title: string;
  category: string;
  limit: number;
  spent: number;
  alertThreshold: number;
  color?: string;
};

export type Transaction = {
  id: string;
  title: string;
  amount: number;
  category: string;
  date: string;
  account?: string;
  note?: string;
};

export type UserPrefs = {
  currency: CurrencyCode;
  darkMode: boolean;
  startOfWeek: 'Monday' | 'Sunday';
  billReminders: boolean;
  budgetAlerts: boolean;
  faceIdEnabled: boolean;
};

export type AuthState = {
  email: string;
  name: string;
  password?: string;
};
