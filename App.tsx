import 'react-native-gesture-handler';
import React from 'react';
import { AppNavigator } from './src/navigation/AppNavigator';
import { DataProvider } from './src/context/DataContext';

export default function App() {
  return (
    <DataProvider>
      <AppNavigator />
    </DataProvider>
  );
}
