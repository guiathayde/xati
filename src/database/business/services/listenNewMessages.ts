import { openConnectionMessageTable } from '../../infrastructure/realm';
import { IMessage } from 'react-native-gifted-chat';

export const listenNewMessage = async (
  chatId: string,
  onNewMessageCallback: (newMessage: IMessage) => void,
) => {
  const realm = await openConnectionMessageTable(chatId);

  const messages = realm.objects('Message');

  function onMessagesChange(
    messages: Realm.Collection<Realm.Object>,
    changes: Realm.CollectionChangeSet,
  ) {
    changes.insertions.forEach((index: number) => {
      const newMessage = messages[index] as unknown as IMessage;
      onNewMessageCallback(newMessage);
    });
  }

  messages.addListener(onMessagesChange);

  return messages;
};
