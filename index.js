import { AppRegistry } from 'react-native';
import { App } from './src/App';
import { name as appName } from './app.json';

import '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

if (__DEV__) {
  const ip = '192.168.1.101';

  auth().useEmulator(`http://${ip}:9099`);
  firestore().useEmulator(ip, 8080);
  storage().useEmulator(ip, 9199);
}

AppRegistry.registerComponent(appName, () => App);
