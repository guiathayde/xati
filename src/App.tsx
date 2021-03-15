import 'react-native-gesture-handler';

import React, { useEffect } from 'react';
import { LogBox, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';
import messaging from '@react-native-firebase/messaging';
import { onDisplayNotification } from './services/Notifications';

import AppProvider from './hooks';

import Routes from './routes';

const App: React.FC = () => {
  LogBox.ignoreLogs([
    'Setting a timer for a long period of time,',
    'Warning: AsyncStorage',
    'Warning: AsyncStorage has been extracted from',
  ]);

  useEffect(() => {
    SplashScreen.hide();

    const initialize = async () => {
      const authNotificationStatus = await messaging()
        .hasPermission()
        .then(response => {
          return response;
        })
        .catch(error =>
          console.log('Erro ao pegar autorização de notificação: ', error),
        );
      if (authNotificationStatus !== messaging.AuthorizationStatus.AUTHORIZED) {
        messaging()
          .requestPermission()
          .then(response =>
            console.log('Notification permissin authorized: ', response),
          )
          .catch(error => console.log('No notification permission: ', error));
      }

      messaging().onMessage(async notification => {
        console.log('Notificação em primeiro plano recebida', notification);

        await onDisplayNotification(notification);
      });

      messaging().setBackgroundMessageHandler(async notification => {
        console.log('Notificação em segundo plano recebida', notification);

        await onDisplayNotification(notification);
      });
    };
    initialize();
  }, []);

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

export default App;
