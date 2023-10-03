import { Event, EventType } from '@notifee/react-native';
import { navigate } from '../navigation';

interface UserToChat {
  uid: string;
  displayName: string;
  photoURL: string;
  phoneNumber: string;
}

export async function handleNotifeeNotificationEvent({ type, detail }: Event) {
  if (type === EventType.PRESS) {
    const chatId = detail.notification?.data?.chatId as string | undefined;
    const userToChat = detail.notification?.data?.userToChat as
      | UserToChat
      | undefined;

    if (!chatId || !userToChat) {
      return;
    }

    navigate('Chat', {
      chatId,
      userToChat,
    });
  }
}
