import { AppRegistry } from 'react-native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import messaging from '@react-native-firebase/messaging';
import notifee, { EventType } from '@notifee/react-native';

import App from './App';
import { name as appName } from './app.json';

GoogleSignin.configure({
  webClientId:
    '286144758481-3cuf75tr9n33g7rh2pk06mnf72f6v0hq.apps.googleusercontent.com',
});

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
  notifee.displayNotification(JSON.parse(remoteMessage.data.notifee));
});

notifee.onBackgroundEvent(async ({ type, detail }) => {
  const { notification, pressAction } = detail;

  // Check if the user pressed the "Mark as read" action
  if (type === EventType.ACTION_PRESS && pressAction.id === 'mark-as-read') {
    // Remove the notification
    await notifee.cancelNotification(notification.id);
  }
});

AppRegistry.registerComponent(appName, () => App);
