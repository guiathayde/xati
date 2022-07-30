/**
 * @format
 */

import { AppRegistry } from 'react-native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

import App from './App';
import { name as appName } from './app.json';

GoogleSignin.configure({
  webClientId:
    '286144758481-3cuf75tr9n33g7rh2pk06mnf72f6v0hq.apps.googleusercontent.com',
});

AppRegistry.registerComponent(appName, () => App);
