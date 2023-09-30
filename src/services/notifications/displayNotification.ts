import { FirebaseMessagingTypes } from '@react-native-firebase/messaging';
import notifee, {
  AndroidGroupAlertBehavior,
  AndroidImportance,
  AndroidMessagingStyleMessage,
  AndroidStyle,
  AuthorizationStatus,
} from '@notifee/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function displayNotification(
  remoteMessage: FirebaseMessagingTypes.RemoteMessage,
) {
  let chatId = remoteMessage.data?.chatId;
  let userUid = remoteMessage.data?.userUid;
  let displayName = remoteMessage.data?.displayName;
  let photoURL = remoteMessage.data?.photoURL;
  let phoneNumber = remoteMessage.data?.phoneNumber;
  let messageText = remoteMessage.data?.messageText;
  let messageCreatedAt = remoteMessage.data?.messageCreatedAt;

  if (
    !chatId ||
    !userUid ||
    !displayName ||
    !photoURL ||
    !phoneNumber ||
    !messageText ||
    !messageCreatedAt
  ) {
    return;
  }

  if (
    typeof chatId !== 'string' ||
    typeof userUid !== 'string' ||
    typeof displayName !== 'string' ||
    typeof photoURL !== 'string' ||
    typeof phoneNumber !== 'string' ||
    typeof messageText !== 'string' ||
    typeof messageCreatedAt !== 'string'
  ) {
    return;
  }

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
  });

  await AsyncStorage.setItem(
    `@Xati:${userUid}:notification:messages`,
    JSON.stringify(messages),
  );
}
