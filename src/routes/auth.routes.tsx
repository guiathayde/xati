import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import FirstScreen from '../pages/FirstScreen';
import SignUp from '../pages/SignUp';
import UploadProfilePhoto from '../pages/UploadProfilePhoto';
import RegisterSuccess from '../pages/RegisterSuccess';
import SignIn from '../pages/SignIn';
import ForgotPassword from '../pages/ForgotPassword';

const Auth = createStackNavigator();

const AuthRoutes: React.FC = () => (
  <Auth.Navigator
    screenOptions={{
      headerShown: false,
      cardStyle: { backgroundColor: '#312e38' },
    }}
  >
    <Auth.Screen name="FirstScreen" component={FirstScreen} />

    <Auth.Screen name="SignUp" component={SignUp} />
    <Auth.Screen name="UploadProfilePhoto" component={UploadProfilePhoto} />
    <Auth.Screen name="RegisterSuccess" component={RegisterSuccess} />

    <Auth.Screen name="SignIn" component={SignIn} />
    <Auth.Screen name="ForgotPassword" component={ForgotPassword} />
  </Auth.Navigator>
);

export default AuthRoutes;
