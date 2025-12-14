# BudgetMate (React Native / Expo)

Offline-first budgeting demo built with Expo + React Native. It covers onboarding, authentication, budgets, transactions, and settings with local persistence via AsyncStorage.

## Quick start

```bash
npm install
npm run start   # then press i / a to open iOS / Android simulator, or scan with Expo Go
```

## Demo credentials

- Email: `demo@budgetmate.app`
- Password: `password123`

You can also sign up with your own email/password; everything stays on-device.

## What’s included

- Onboarding carousel with skip/next and locally stored completion flag.
- Auth flow (sign in / sign up) gated before the tab experience.
- Bottom tabs: Home, Budgets, Transactions, Settings.
- Local data layer (budgets, transactions, user prefs) persisted with `@react-native-async-storage/async-storage` and seeded with example data.
- Create budget form (adds to local store) and “add sample transaction” action to verify persistence.
- Settings toggles for reminders, alerts, face ID flag, dark mode preference (stored locally).

## File map

- `App.tsx` — wraps `DataProvider` + navigation.
- `src/context/DataContext.tsx` — single source of truth for data + persistence helpers.
- `src/navigation/AppNavigator.tsx` — stack (onboarding/auth/app) + tabs (home/budgets/transactions/settings).
- `src/screens/*` — UI for onboarding, auth, budgets, transactions, settings, create budget.
- `src/storage/storage.ts` — AsyncStorage helpers + seed bootstrap.

## Notes

- All data is local; no backend calls. AsyncStorage bootstrap seeds demo budgets/transactions/prefs.
- The UI uses the yellow/black/blue palette inspired by the provided mockups; swap values in `src/theme/colors.ts` as needed.
- Add more screens or charts by extending the data context and plugging into the existing tab stack.

