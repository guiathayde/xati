import { IMessage } from 'react-native-gifted-chat';
import { Results } from 'realm';

import { openConnectionMessageTable } from '../../infrastructure/realm';

let receivedMessages: Results<IMessage & Object>;
export const getAllMessages = async (chatId: string) => {
  const realm = await openConnectionMessageTable(chatId);


  realm.write(() => {
    receivedMessages = realm.objects<IMessage>('Message');
  });

  return receivedMessages;
};
