import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Home from '../pages/Home';
import Profile from '../pages/Profile';
import Chat from '../pages/Chat';
import SearchUser from '../pages/SearchUser';

const App = createStackNavigator();

const AppRoutes: React.FC = () => (
  <App.Navigator
    screenOptions={{
      headerShown: false,
      cardStyle: { backgroundColor: '#312e38' },
    }}
  >
    <App.Screen name="Home" component={Home} />

    <App.Screen name="Chat" component={Chat} />

    <App.Screen name="Profile" component={Profile} />

    <App.Screen name="SearchUser" component={SearchUser} />
  </App.Navigator>
);

export default AppRoutes;
