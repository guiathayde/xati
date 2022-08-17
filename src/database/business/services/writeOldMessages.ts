import { openConnectionMessageTable } from '../../infrastructure/realm';
import { IMessageObject } from '../models/interfaces/IMessage';
import { IMessage } from 'react-native-gifted-chat';

export const writeOldMessages = async (
  chatId: string,
  oldMessages: IMessage[],
) => {
  const realm = await openConnectionMessageTable(chatId);

  const oldMessagesStored: (IMessageObject & IMessage)[] = [];
  realm.write(() => {
    oldMessages.forEach(message => {
      oldMessagesStored.push(realm.create('Message', message));
    });
  });

  return oldMessagesStored;
};
