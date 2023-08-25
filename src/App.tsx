import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import { AppProvider } from './hooks';

import { Routes } from './routes';

export const App: React.FC = () => {
  return (
    <NavigationContainer>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor="transparent"
      />
      <AppProvider>
        <Routes />
      </AppProvider>
    </NavigationContainer>
  );
};
