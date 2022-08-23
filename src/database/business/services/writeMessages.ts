import { openConnectionMessageTable } from '../../infrastructure/realm';
import { IMessageObject } from '../models/interfaces/IMessage';
import { IMessage } from 'react-native-gifted-chat';

export const writeMessages = async (
  chatId: string,
  oldMessages: IMessage[],
) => {
  const realm = await openConnectionMessageTable(chatId);

  const oldMessagesStored: (IMessageObject & IMessage)[] = [];
  try {
    realm.write(() => {
      oldMessages.forEach(message => {
        oldMessagesStored.push(realm.create('Message', message));
      });
    });
  } catch (error: any) {
    const isErrorWritingObjectWithSamePrimaryKeyType = String(
      error.message,
    ).includes(
      "Attempting to create an object of type 'Message' with an existing primary key value",
    );

    if (!isErrorWritingObjectWithSamePrimaryKeyType) {
      throw new Error(`Error writing old messages: ${error.message}`);
    }
  }

  return oldMessagesStored;
};
