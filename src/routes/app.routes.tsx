import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Home } from '../screens/Home';

export type AppNativeStackNavigatorProps = {
  Home: undefined;
};

const App = createNativeStackNavigator<AppNativeStackNavigatorProps>();

export const AppRoutes: React.FC = () => (
  <App.Navigator>
    <App.Screen name="Home" component={Home} />
  </App.Navigator>
);
