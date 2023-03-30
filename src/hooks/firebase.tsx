import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { initializeApp, FirebaseApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

interface FirebaseContextData {
  firebaseApp: FirebaseApp;
  getFirebaseCloudMessagingToken: () => Promise<string>;
  foregroundNotification: ForegroundNotification | undefined;
}

interface FirebaseProviderProps {
  children: React.ReactNode;
}

interface ForegroundNotification {
  title: string;
  body: string;
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
  const messaging = useMemo(() => getMessaging(firebaseApp), [firebaseApp]);

  const [foregroundNotification, setForegroundNotification] =
    useState<ForegroundNotification>();

  const getOrRegisterServiceWorker = useCallback(async () => {
    return window.navigator.serviceWorker
      .getRegistration('/firebase-push-notification-scope')
      .then(serviceWorker => {
        if (serviceWorker) return serviceWorker;
        return window.navigator.serviceWorker.register(
          '/firebase-messaging-sw.js',
          {
            scope: '/firebase-push-notification-scope',
          },
        );
      });
  }, []);

  const getFirebaseCloudMessagingToken = useCallback(async () => {
    return getOrRegisterServiceWorker().then(serviceWorkerRegistration =>
      getToken(messaging, {
        vapidKey: process.env.REACT_APP_FIREBASE_CLOUD_MESSAGING_KEY,
        serviceWorkerRegistration,
      }),
    );
  }, [getOrRegisterServiceWorker, messaging]);

  useEffect(() => {
    // Check if the browser supports notifications
    if ('Notification' in window) {
      if (Notification.permission !== 'denied') {
        Notification.requestPermission().then(permission => {
          if (permission === 'granted') {
            console.log('Notification permission granted.');
          }
        });
      }

      if (Notification.permission === 'granted') {
        onMessage(messaging, payload => {
          console.log('Received foreground message: ', payload);

          if (payload.notification) {
            setForegroundNotification({
              title: payload.notification.title || '',
              body: payload.notification.body || '',
            });

            setTimeout(() => {
              setForegroundNotification(undefined);
            }, 5000);
          }
        });
      }
    } else console.error('This browser does not support desktop notification');

    return () => {
      setForegroundNotification(undefined);
    };
  }, []);

  return (
    <FirebaseContext.Provider
      value={{
        firebaseApp,
        getFirebaseCloudMessagingToken,
        foregroundNotification,
      }}
    >
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
