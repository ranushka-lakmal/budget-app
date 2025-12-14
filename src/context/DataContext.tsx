import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { Alert } from 'react-native';
import { Budget, Transaction, UserPrefs, AuthState } from '../types';
import {
  bootstrapData,
  getOnboardingDone,
  loadBudgets,
  loadPrefs,
  loadTransactions,
  loadUser,
  saveBudgets,
  savePrefs,
  saveTransactions,
  saveUser,
  setOnboardingDone,
} from '../storage/storage';
import { seedUser } from '../data/seed';

type DataContextValue = {
  budgets: Budget[];
  transactions: Transaction[];
  prefs: UserPrefs;
  user: AuthState | null;
  loading: boolean;
  onboardingDone: boolean;
  setOnboardingDone: (done: boolean) => void;
  addBudget: (budget: Omit<Budget, 'id' | 'spent'>) => Promise<void>;
  addTransaction: (tx: Omit<Transaction, 'id'>) => Promise<void>;
  updatePrefs: (prefs: Partial<UserPrefs>) => Promise<void>;
  signIn: (email: string, password: string) => Promise<boolean>;
  signUp: (name: string, email: string, password: string) => Promise<boolean>;
  signOut: () => Promise<void>;
};

const DataContext = createContext<DataContextValue | undefined>(undefined);

const DEFAULT_PASSWORD = 'password123';

export const DataProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [prefs, setPrefs] = useState<UserPrefs>({
    currency: 'USD',
    darkMode: false,
    startOfWeek: 'Monday',
    billReminders: true,
    budgetAlerts: true,
    faceIdEnabled: false,
  });
  const [user, setUser] = useState<AuthState | null>(null);
  const [loading, setLoading] = useState(true);
  const [onboardingDone, setOnboardingDoneState] = useState(false);

  useEffect(() => {
    (async () => {
      await bootstrapData();
      const [loadedBudgets, loadedTx, loadedPrefs, loadedUser, onboardingFlag] = await Promise.all([
        loadBudgets(),
        loadTransactions(),
        loadPrefs(),
        loadUser(),
        getOnboardingDone(),
      ]);
      setBudgets(loadedBudgets);
      setTransactions(loadedTx);
      setPrefs(loadedPrefs);
      setUser(loadedUser);
      setOnboardingDoneState(onboardingFlag);
      setLoading(false);
    })();
  }, []);

  const persistBudgets = async (next: Budget[]) => {
    setBudgets(next);
    await saveBudgets(next);
  };

  const persistTransactions = async (next: Transaction[]) => {
    setTransactions(next);
    await saveTransactions(next);
  };

  const addBudget = async (budget: Omit<Budget, 'id' | 'spent'>) => {
    const newBudget: Budget = { ...budget, id: `${budget.title}-${Date.now()}`, spent: 0 };
    await persistBudgets([newBudget, ...budgets]);
  };

  const addTransaction = async (tx: Omit<Transaction, 'id'>) => {
    const newTx: Transaction = { ...tx, id: `${tx.title}-${Date.now()}` };
    await persistTransactions([newTx, ...transactions]);
    if (tx.amount < 0) {
      const match = budgets.find((b) => b.category === tx.category || b.title === tx.category);
      if (match) {
        const updated = budgets.map((b) =>
          b.id === match.id ? { ...b, spent: b.spent + Math.abs(tx.amount) } : b,
        );
        await persistBudgets(updated);
      }
    }
  };

  const updatePrefs = async (partial: Partial<UserPrefs>) => {
    const nextPrefs = { ...prefs, ...partial };
    setPrefs(nextPrefs);
    await savePrefs(nextPrefs);
  };

  const signIn = async (email: string, password: string) => {
    const stored = await loadUser();
    const expectedPassword = stored?.password ?? DEFAULT_PASSWORD;
    if (!stored && email === seedUser.email && password === DEFAULT_PASSWORD) {
      setUser(seedUser);
      await saveUser(seedUser);
      return true;
    }
    if (stored && email === stored.email && password === expectedPassword) {
      setUser(stored);
      await saveUser(stored);
      return true;
    }
    Alert.alert('Incorrect password', `Try "password123" or the password you set when signing up.`);
    return false;
  };

  const signUp = async (name: string, email: string, password: string) => {
    if (!email || !name || password.length < 6) {
      Alert.alert('Invalid data', 'Please provide name, email and a password (6+ chars).');
      return false;
    }
    const nextUser: AuthState = { name, email, password };
    setUser(nextUser);
    await saveUser(nextUser);
    return true;
  };

  const signOut = async () => {
    setUser(null);
    await saveUser(null);
  };

  const handleOnboardingDone = async (done: boolean) => {
    setOnboardingDoneState(done);
    await setOnboardingDone(done);
  };

  const value = useMemo(
    () => ({
      budgets,
      transactions,
      prefs,
      user,
      loading,
      onboardingDone,
      setOnboardingDone: handleOnboardingDone,
      addBudget,
      addTransaction,
      updatePrefs,
      signIn,
      signUp,
      signOut,
    }),
    [budgets, transactions, prefs, user, loading, onboardingDone],
  );

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export const useData = () => {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error('useData must be used within DataProvider');
  return ctx;
};
