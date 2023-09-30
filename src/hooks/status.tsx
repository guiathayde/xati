import React, { createContext, useState, useContext, useEffect } from 'react';
import { AppState } from 'react-native';
import firestore from '@react-native-firebase/firestore';

import { useAuth } from './auth';

interface StatusContextData {
  currentChatId: string | null;
  setCurrentChatId: React.Dispatch<React.SetStateAction<string | null>>;
}

const StatusContext = createContext<StatusContextData>({} as StatusContextData);

export const StatusProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user } = useAuth();

  const [currentChatId, setCurrentChatId] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      firestore().collection('usersStatus').doc(user.uid).set(
        {
          userUid: user.uid,
          currentChatId,
        },
        {
          merge: true,
        },
      );
    }
  }, [user, currentChatId]);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (user) {
        if (nextAppState === 'background' || nextAppState === 'inactive') {
          firestore().collection('usersStatus').doc(user.uid).delete();
        }
      }
    });

    return () => {
      subscription.remove();
    };
  }, [currentChatId, user]);

  return (
    <StatusContext.Provider
      value={{
        currentChatId,
        setCurrentChatId,
      }}
    >
      {children}
    </StatusContext.Provider>
  );
};

export function useStatus(): StatusContextData {
  const context = useContext(StatusContext);

  if (!context) {
    throw new Error('useStatus must be used within an StatusProvider');
  }

  return context;
}
