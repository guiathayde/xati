import React, { useState, useEffect } from 'react';
import auth from '@react-native-firebase/auth';

import { AuthRoutes } from './auth.routes';
import { AppRoutes } from './app.routes';

type User = {
  uid: string;
};

export const Routes: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(userInfo => {
      setUser(userInfo);
    });

    return subscriber;
  }, []);

  if (user) return <AppRoutes />;

  return <AuthRoutes />;
};
