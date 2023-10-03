import React, {
  createContext,
  useContext,
  useEffect,
  useCallback,
} from 'react';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import { useAuth } from './auth';

import { displayNotification } from '../services/notifications/displayNotification';

interface Notification {
  chatId: string;
  user: FirebaseAuthTypes.User;
  newMessage: {
    userUid: string;
    text: string;
    createdAt: string;
  };
}

interface ForegroundNotificationsContextData {}

const ForegroundNotificationsContext =
  createContext<ForegroundNotificationsContextData>(
    {} as ForegroundNotificationsContextData,
  );

export const ForegroundNotificationsProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const { user } = useAuth();

  const getOldNotifications = useCallback(
    async (currentUser: FirebaseAuthTypes.User) => {
      const oldNotificationsDocs = await firestore()
        .collection('users')
        .doc(currentUser.uid)
        .collection('notifications')
        .get();

      if (oldNotificationsDocs != null && !oldNotificationsDocs.empty) {
        const oldNotifications = oldNotificationsDocs.docs.map(doc =>
          doc.data(),
        ) as Notification[];

        console.log('Old notifications: ', oldNotifications);

        for (const notification of oldNotifications) {
          await displayNotification({
            chatId: notification.chatId,
            userUid: notification.user.uid,
            displayName:
              notification.user.displayName ??
              notification.user.phoneNumber ??
              '',
            photoURL: notification.user.photoURL ?? '',
            phoneNumber: notification.user.phoneNumber ?? '',
            messageText: notification.newMessage.text,
            messageCreatedAt: notification.newMessage.createdAt,
          });
        }

        for (const notificationDoc of oldNotificationsDocs.docs) {
          await notificationDoc.ref.delete();
        }
      }
    },
    [],
  );

  const listenToNewNotifications = useCallback(
    (currentUser: FirebaseAuthTypes.User) => {
      return firestore()
        .collection('users')
        .doc(currentUser.uid)
        .collection('notifications')
        .onSnapshot(querySnapshot => {
          querySnapshot.docChanges().forEach(async change => {
            if (change.type === 'added') {
              const newNotification = change.doc.data() as Notification;

              await displayNotification({
                chatId: newNotification.chatId,
                userUid: newNotification.user.uid,
                displayName:
                  newNotification.user.displayName ??
                  newNotification.user.phoneNumber ??
                  '',
                photoURL: newNotification.user.photoURL ?? '',
                phoneNumber: newNotification.user.phoneNumber ?? '',
                messageText: newNotification.newMessage.text,
                messageCreatedAt: newNotification.newMessage.createdAt,
              });

              await change.doc.ref.delete();
            }
          });
        });
    },
    [],
  );

  const getOldAndListenNotifications = useCallback(
    async (currentUser: FirebaseAuthTypes.User) => {
      await getOldNotifications(currentUser);

      return listenToNewNotifications(currentUser);
    },
    [getOldNotifications, listenToNewNotifications],
  );

  useEffect(() => {
    if (user) {
      const subscriber = getOldAndListenNotifications(user);

      return () => {
        subscriber.then(unsubscribe => unsubscribe());
      };
    }
  }, [user, getOldAndListenNotifications]);

  return (
    <ForegroundNotificationsContext.Provider value={{}}>
      {children}
    </ForegroundNotificationsContext.Provider>
  );
};

export function useForegroundNotifications(): ForegroundNotificationsContextData {
  const context = useContext(ForegroundNotificationsContext);

  if (!context) {
    throw new Error(
      'useForegroundNotifications must be used within an ForegroundNotificationsProvider',
    );
  }

  return context;
}
