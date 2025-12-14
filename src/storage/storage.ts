import AsyncStorage from '@react-native-async-storage/async-storage';
import { Budget, Transaction, UserPrefs, AuthState } from '../types';
import { seedBudgets, seedTransactions, seedPrefs, seedUser } from '../data/seed';

const KEYS = {
  budgets: '@budgetmate/budgets',
  transactions: '@budgetmate/transactions',
  prefs: '@budgetmate/prefs',
  user: '@budgetmate/user',
  onboarding: '@budgetmate/onboardingDone',
};

export async function bootstrapData() {
  const [budgets, transactions, prefs, user] = await Promise.all([
    AsyncStorage.getItem(KEYS.budgets),
    AsyncStorage.getItem(KEYS.transactions),
    AsyncStorage.getItem(KEYS.prefs),
    AsyncStorage.getItem(KEYS.user),
  ]);

  if (!budgets) {
    await AsyncStorage.setItem(KEYS.budgets, JSON.stringify(seedBudgets));
  }
  if (!transactions) {
    await AsyncStorage.setItem(KEYS.transactions, JSON.stringify(seedTransactions));
  }
  if (!prefs) {
    await AsyncStorage.setItem(KEYS.prefs, JSON.stringify(seedPrefs));
  }
  if (!user) {
    await AsyncStorage.setItem(KEYS.user, JSON.stringify(seedUser));
  }
}

export async function loadBudgets(): Promise<Budget[]> {
  const data = await AsyncStorage.getItem(KEYS.budgets);
  return data ? JSON.parse(data) : [];
}

export async function saveBudgets(budgets: Budget[]) {
  await AsyncStorage.setItem(KEYS.budgets, JSON.stringify(budgets));
}

export async function loadTransactions(): Promise<Transaction[]> {
  const data = await AsyncStorage.getItem(KEYS.transactions);
  return data ? JSON.parse(data) : [];
}

export async function saveTransactions(transactions: Transaction[]) {
  await AsyncStorage.setItem(KEYS.transactions, JSON.stringify(transactions));
}

export async function loadPrefs(): Promise<UserPrefs> {
  const data = await AsyncStorage.getItem(KEYS.prefs);
  return data ? JSON.parse(data) : seedPrefs;
}

export async function savePrefs(prefs: UserPrefs) {
  await AsyncStorage.setItem(KEYS.prefs, JSON.stringify(prefs));
}

export async function loadUser(): Promise<AuthState | null> {
  const data = await AsyncStorage.getItem(KEYS.user);
  return data ? JSON.parse(data) : null;
}

export async function saveUser(user: AuthState | null) {
  if (!user) {
    await AsyncStorage.removeItem(KEYS.user);
    return;
  }
  await AsyncStorage.setItem(KEYS.user, JSON.stringify(user));
}

export async function setOnboardingDone(done: boolean) {
  await AsyncStorage.setItem(KEYS.onboarding, JSON.stringify(done));
}

export async function getOnboardingDone(): Promise<boolean> {
  const flag = await AsyncStorage.getItem(KEYS.onboarding);
  return flag ? JSON.parse(flag) : false;
}

