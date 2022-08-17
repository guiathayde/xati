import { openConnectionMessageTable } from '../../infrastructure/realm';
import { IMessageObject } from '../models/interfaces/IMessage';
import { IMessage } from 'react-native-gifted-chat';

let createdMessage: IMessageObject & IMessage;
export const writeMessage = async (chatId: string, message: IMessage) => {
  const realm = await openConnectionMessageTable(chatId);

  realm.write(() => {
    createdMessage = realm.create('Message', message);
  });

  realm.close();

  return createdMessage;
};
