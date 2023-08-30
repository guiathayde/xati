import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { SignIn } from '../screens/SignIn';
import { PhoneSignIn } from '../screens/PhoneSignIn';

export type AuthNativeStackNavigatorProps = {
  SignIn: undefined;
  PhoneSignIn: undefined;
};

const Auth = createNativeStackNavigator<AuthNativeStackNavigatorProps>();

export const AuthRoutes: React.FC = () => (
  <Auth.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <Auth.Screen name="SignIn" component={SignIn} />
    <Auth.Screen name="PhoneSignIn" component={PhoneSignIn} />
  </Auth.Navigator>
);
