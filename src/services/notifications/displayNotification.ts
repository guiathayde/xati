import notifee, {
  AndroidGroupAlertBehavior,
  AndroidImportance,
  AndroidMessagingStyleMessage,
  AndroidStyle,
  AuthorizationStatus,
} from '@notifee/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Notification {
  chatId: string;
  userUid: string;
  displayName: string;
  photoURL: string;
  phoneNumber: string;
  messageText: string;
  messageCreatedAt: string;
}

export async function displayNotification({
  chatId,
  userUid,
  displayName,
  photoURL,
  phoneNumber,
  messageText,
  messageCreatedAt,
}: Notification) {
  const currentSettings = await notifee.getNotificationSettings();
  if (currentSettings.authorizationStatus === AuthorizationStatus.DENIED) {
    return;
  }

  const channelId = await notifee.createChannel({
    id: userUid,
    name: displayName,
    importance: AndroidImportance.HIGH,
  });

  const oldMessagesString = await AsyncStorage.getItem(
    `@Xati:${userUid}:notification:messages`,
  );

  const messages: AndroidMessagingStyleMessage[] = [];

  if (oldMessagesString) {
    const oldMessages = JSON.parse(
      oldMessagesString,
    ) as AndroidMessagingStyleMessage[];

    messages.push(...oldMessages);
  }

  messages.push({
    text: messageText,
    timestamp: new Date(messageCreatedAt).getTime(),
    person: {
      name: displayName,
      icon: photoURL,
    },
  });

  await notifee.displayNotification({
    id: userUid,
    title: displayName,
    body: messageText,
    data: {
      chatId,
      userToChat: {
        uid: userUid,
        displayName: displayName,
        photoURL: photoURL,
        phoneNumber: phoneNumber,
      },
    },
    android: {
      pressAction: {
        id: userUid,
        launchActivity: 'default',
      },
      channelId,
      groupSummary: true,
      groupId: userUid,
      groupAlertBehavior: AndroidGroupAlertBehavior.SUMMARY,
      showTimestamp: true,
      largeIcon: photoURL,
      style: {
        type: AndroidStyle.MESSAGING,
        person: {
          name: displayName,
          icon: photoURL,
        },
        messages,
      },
    },
    ios: {
      categoryId: 'chat',
      summaryArgument: displayName,
      foregroundPresentationOptions: {
        badge: true,
        sound: true,
        banner: true,
        list: true,
      },
    },
  });

  await AsyncStorage.setItem(
    `@Xati:${userUid}:notification:messages`,
    JSON.stringify(messages),
  );
}
