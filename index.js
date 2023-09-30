import '@react-native-firebase/app';
import messaging from '@react-native-firebase/messaging';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import notifee from '@notifee/react-native';
import { AppRegistry } from 'react-native';

import { displayNotification } from './src/services/notifications/displayNotification';
import { handleBackgroundEvent } from './src/services/notifications/handleBackgroundEvent';

import { App } from './src/App';
import { name as appName } from './app.json';

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);

  await displayNotification(remoteMessage);
});

notifee.onBackgroundEvent(async event => {
  console.log('Background event received: ', event);

  await handleBackgroundEvent(event);
});

if (__DEV__) {
  const ip = '192.168.0.15';

  auth().useEmulator(`http://${ip}:9099`);
  firestore().useEmulator(ip, 8080);
  storage().useEmulator(ip, 9199);
}

AppRegistry.registerComponent(appName, () => App);
