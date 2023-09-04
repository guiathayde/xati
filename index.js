import { AppRegistry } from 'react-native';
import { App } from './src/App';
import { name as appName } from './app.json';

import '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

// set the host and the port property to connect to the emulator
// set these before any read/write operations occur to ensure it doesn't affect your Cloud Firestore data!
if (__DEV__) {
  auth().useEmulator('http://192.168.1.104:9099');
  firestore().useEmulator('192.168.1.104', 8080);
  storage().useEmulator('192.168.1.104', 9199);
}

AppRegistry.registerComponent(appName, () => App);
