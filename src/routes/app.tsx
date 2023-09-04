import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Home } from '../screens/Home';
import { Profile } from '../screens/Profile';
import { SearchUser } from '../screens/SearchUser';
import { Chat } from '../screens/Chat';

export type AppNativeStackNavigatorProps = {
  Home: undefined;
  Profile: {
    isNewUser: boolean;
  };
  SearchUser: undefined;
  Chat: {
    chatId: string;
    userToChat: {
      uid: string;
      displayName: string;
      photoURL: string;
    };
  };
};

const App = createNativeStackNavigator<AppNativeStackNavigatorProps>();

export const AppRoutes: React.FC = () => (
  <App.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <App.Screen name="Home" component={Home} />
    <App.Screen name="Profile" component={Profile} />
    <App.Screen name="SearchUser" component={SearchUser} />
    <App.Screen name="Chat" component={Chat} />
  </App.Navigator>
);
