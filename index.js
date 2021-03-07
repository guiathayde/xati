/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';

import messaging from '@react-native-firebase/messaging';
import { onDisplayNotification } from './src/services/Notifications';

const authNotificationStatus = await firebase.messaging().hasPermission();
if (
  authNotificationStatus !== firebase.messaging.AuthorizationStatus.AUTHORIZED
) {
  await messaging()
    .requestPermission()
    .then(response =>
      console.log('Notification permissin authorized: ', response),
    );
}

messaging().onMessage(async notification => {
  console.log('Notificação em primeiro plano recebida', notification);

  await onDisplayNotification(notification);
});

messaging().setBackgroundMessageHandler(async notification => {
  console.log('Notificação em segundo plano recebida', notification);

  await onDisplayNotification(notification);
});

AppRegistry.registerComponent(appName, () => App);
