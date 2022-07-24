import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { SignIn } from '../screens/SignIn';

const Auth = createNativeStackNavigator();

export const AuthRoutes: React.FC = () => (
  <Auth.Navigator screenOptions={{ headerShown: false }}>
    <Auth.Screen name="SignIn" component={SignIn} />
  </Auth.Navigator>
);
