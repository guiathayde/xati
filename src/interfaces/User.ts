import { FirebaseAuthTypes } from '@react-native-firebase/auth';

export interface User extends FirebaseAuthTypes.UserInfo {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
}
