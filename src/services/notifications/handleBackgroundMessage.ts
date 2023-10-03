import { FirebaseMessagingTypes } from '@react-native-firebase/messaging';

import { displayNotification } from './displayNotification';

export async function handleBackgroundMessage(
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

  await displayNotification({
    chatId,
    userUid,
    displayName,
    photoURL,
    phoneNumber,
    messageText,
    messageCreatedAt,
  });
}
