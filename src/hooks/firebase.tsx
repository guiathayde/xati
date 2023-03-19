import { createContext, useContext, useMemo } from 'react';
import { initializeApp, FirebaseApp } from 'firebase/app';

interface FirebaseContextData {
  firebaseApp: FirebaseApp;
}

interface FirebaseProviderProps {
  children: React.ReactNode;
}

const FirebaseContext = createContext<FirebaseContextData>(
  {} as FirebaseContextData,
);

export function FirebaseProvider({ children }: FirebaseProviderProps) {
  const firebaseApp = useMemo(() => {
    const firebaseConfig = {
      apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
      authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
      projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
      storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.REACT_APP_FIREBASE_APP_ID,
      measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
    };

    const app = initializeApp(firebaseConfig);

    return app;
  }, []);

  return (
    <FirebaseContext.Provider value={{ firebaseApp }}>
      {children}
    </FirebaseContext.Provider>
  );
}

export function useFirebase() {
  const context = useContext(FirebaseContext);

  if (!context) {
    throw new Error('useFirebase must be used within an FirebaseProvider');
  }

  return context;
}
