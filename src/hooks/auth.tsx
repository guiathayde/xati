import React, { createContext, useState, useContext, useEffect } from 'react';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import messaging from '@react-native-firebase/messaging';
import firestore from '@react-native-firebase/firestore';

import { api } from '../services/api';
import { Platform } from 'react-native';

interface AuthContextData {
  user: FirebaseAuthTypes.User | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState(auth().currentUser);
  const [loading, setLoading] = useState(true);

  async function onAuthStateChanged(
    currentUser: FirebaseAuthTypes.User | null,
  ) {
    setUser(currentUser);
    setLoading(false);

    if (currentUser !== null) {
      const token = await currentUser.getIdToken(true);

      api.defaults.headers.common.Authorization = `Bearer ${token}`;

      const os = Platform.OS;

      let fcmToken: string | null = null;

      // APNS not configured, is necessary Apple Developer Account
      if (os !== 'ios') {
        fcmToken = await messaging().getToken();
      }

      firestore().collection('users').doc(currentUser.uid).set(
        {
          os,
          fcmToken,
        },
        {
          merge: true,
        },
      );
    }
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return () => subscriber();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
