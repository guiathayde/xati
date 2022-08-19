import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';
import Toast from 'react-native-toast-message';

import { AppProvider } from './src/hooks';
import { Routes } from './src/routes';

const App = () => {
  React.useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <NavigationContainer>
      <AppProvider>
        <Routes />
        <Toast />
      </AppProvider>
    </NavigationContainer>
  );
};

export default App;
