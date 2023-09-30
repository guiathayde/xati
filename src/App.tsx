import React, { useCallback, useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen';
import messaging from '@react-native-firebase/messaging';
import { Platform, PermissionsAndroid, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import { navigationRef } from './services/navigation';

import { AppProvider } from './hooks';

import { Routes } from './routes';

export const App: React.FC = () => {
  const requestMessagingUserPermission = useCallback(async () => {
    const authStatus = await messaging().requestPermission();

    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Notification authorization status:', authStatus);
    }
  }, []);

  const requestAndroidMessagingUserPermission = useCallback(async () => {
    if (Platform.OS === 'android') {
      const authStatus = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      );

      const enabled =
        authStatus === PermissionsAndroid.RESULTS.GRANTED ||
        authStatus === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN;

      if (enabled) {
        console.log('[Android] Notification authorization status:', authStatus);
      }
    }
  }, []);

  const registerDeviceFCM = useCallback(async () => {
    // APNS not configured, is necessary Apple Developer Account
    if (Platform.OS !== 'ios') {
      if (!messaging().isDeviceRegisteredForRemoteMessages) {
        await messaging().registerDeviceForRemoteMessages();
      }
    }
  }, []);

  useEffect(() => {
    SplashScreen.hide();
    requestMessagingUserPermission();
    requestAndroidMessagingUserPermission();
    registerDeviceFCM();

    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return () => {
      unsubscribe();
    };
  }, [
    requestMessagingUserPermission,
    requestAndroidMessagingUserPermission,
    registerDeviceFCM,
  ]);

  return (
    <NavigationContainer ref={navigationRef}>
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
