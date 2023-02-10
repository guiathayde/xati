import React, { useEffect } from 'react';
import messaging from '@react-native-firebase/messaging';
import notifee, { AuthorizationStatus } from '@notifee/react-native';
import SplashScreen from 'react-native-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import Toast from 'react-native-toast-message';

import { AppProvider } from './src/hooks';
import { Routes } from './src/routes';

const App = () => {
  useEffect(() => {
    SplashScreen.hide();

    notifee.requestPermission().then(settings => {
      if (settings.authorizationStatus === AuthorizationStatus.DENIED) {
        console.log('User denied permissions request');
      } else if (
        settings.authorizationStatus === AuthorizationStatus.AUTHORIZED
      ) {
        console.log('User granted permissions request');
      } else if (
        settings.authorizationStatus === AuthorizationStatus.PROVISIONAL
      ) {
        console.log('User provisionally granted permissions request');
      }
    });

    if (!messaging().isDeviceRegisteredForRemoteMessages) {
      messaging().registerDeviceForRemoteMessages();
    }

    const notificationForegroundUnsubscribe = messaging().onMessage(
      async remoteMessage => {
        console.log(
          'A new FCM message arrived!',
          JSON.stringify(remoteMessage),
        );

        if (remoteMessage.notification) {
          const { title, body } = remoteMessage.notification;

          // Create a channel (required for Android)
          const channelId = await notifee.createChannel({
            id: 'default',
            name: 'Default Channel',
          });

          // Display a notification
          await notifee.displayNotification({
            title,
            body,
            android: {
              channelId,
              actions: [
                {
                  title: 'Mark as Read',
                  pressAction: {
                    id: 'read',
                  },
                },
              ],
              pressAction: {
                id: 'default',
              },
            },
          });
        } else console.log('No data in notification', remoteMessage.data);
      },
    );

    return () => {
      notificationForegroundUnsubscribe();
    };
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
