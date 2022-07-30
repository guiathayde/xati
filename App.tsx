import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { AppProvider } from './src/hooks';
import { Routes } from './src/routes';

const App = () => {
  return (
    <NavigationContainer>
      <AppProvider>
        <Routes />
      </AppProvider>
    </NavigationContainer>
  );
};

export default App;
