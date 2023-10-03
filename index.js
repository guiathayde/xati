import '@react-native-firebase/app';
import messaging from '@react-native-firebase/messaging';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import notifee from '@notifee/react-native';
import { AppRegistry } from 'react-native';

import { handleBackgroundMessage } from './src/services/notifications/handleBackgroundMessage';
import { handleNotifeeNotificationEvent } from './src/services/notifications/handleNotifeeNotificationEvent';

import { App } from './src/App';
import { name as appName } from './app.json';

if (__DEV__) {
  const ip = '192.168.1.101';

  auth().useEmulator(`http://${ip}:9099`);
  firestore().useEmulator(ip, 8080);
  storage().useEmulator(ip, 9199);
}

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);

  await handleBackgroundMessage(remoteMessage);
});

// iOS only
notifee.setNotificationCategories([
  {
    id: 'chat',
    summaryFormat: 'You have %u+ unread messages from %@.',
    actions: [
      {
        id: 'reply',
        title: 'Reply',
      },
    ],
  },
]);

notifee.onBackgroundEvent(async event => {
  console.log('Background event received: ', event);

  await handleNotifeeNotificationEvent(event);
});

notifee.onForegroundEvent(async event => {
  console.log('Foreground event received: ', event);

  await handleNotifeeNotificationEvent(event);
});

AppRegistry.registerComponent(appName, () => App);
