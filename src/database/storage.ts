import AsyncStorage from '@react-native-async-storage/async-storage';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { IMessage } from 'react-native-gifted-chat';

interface IChatData {
  chatId: string;
  user: {
    _id: string;
    name: string;
    avatar: string;
  };
}

const storage = {
  saveChatData: async (chatData: IChatData) => {
    await AsyncStorage.setItem(
      `@Xati:chatData:${chatData.chatId}`,
      JSON.stringify(chatData),
    ).catch(error => {
      console.log('Erro ao salvar chatData no AsyncStorage: ', error);
    });
  },

  updateChatData: async (chatId: string, chatData: IChatData) => {
    await AsyncStorage.mergeItem(
      `@Xati:chatData:${chatId}`,
      JSON.stringify(chatData),
    ).catch(error => {
      console.log('Erro ao atualizar chatData no AsyncStorage: ', error);
    });
  },

  deleteChatData: async (chatId: string) => {
    await AsyncStorage.removeItem(`@Xati:chatData:${chatId}`).catch(error => {
      console.log('Erro ao deletar chatData do AsyncStorage: ', error);
    });
  },

  getAllChatsData: async () => {
    const allKeysFromStorage = await AsyncStorage.getAllKeys().catch(error => {
      console.log('Erro ao pegar todas as keys do AsyncStorage: ', error);
    });

    if (allKeysFromStorage) {
      const chatsIdsKeys = allKeysFromStorage.filter(key => {
        return new RegExp('@Xati:chatData:', 'gim').test(key);
      });

      const chatsDataArray = await AsyncStorage.multiGet(chatsIdsKeys).catch(
        error => {
          console.log(
            'Erro ao pegar todos os chatsData do AsyncStorage: ',
            error,
          );
        },
      );

      if (chatsDataArray) {
        const chatsDataObject = chatsDataArray.map((result, i, store) => {
          let value = store[i][1];
          if (value) {
            return JSON.parse(value) as IChatData;
          }
        });

        return chatsDataObject;
      }
    }
  },

  getChatDataByChatId: async (chatId: string) => {
    return await AsyncStorage.getItem(`@Xati:chatData:${chatId}`)
      .then(response => {
        if (response) {
          return JSON.parse(response) as IChatData;
        }
        return undefined;
      })
      .catch(error => {
        console.log('Erro ao pegar chatData pelo chatId: ', error);
        return undefined;
      });
  },

  saveMessage: async (chatId: string, message: IMessage) => {
    await AsyncStorage.setItem(
      `@Xati:${chatId}:${message._id}`,
      JSON.stringify(message),
    );

    await storage.saveLastMessage(chatId, message);
  },

  saveLastMessage: async (chatId: string, message: IMessage) => {
    const lastMessage = await AsyncStorage.getItem(
      `@Xati:lastMessage:${chatId}`,
    );

    if (lastMessage) {
      await AsyncStorage.mergeItem(
        `@Xati:lastMessage:${chatId}`,
        JSON.stringify(message),
      );
    } else {
      await AsyncStorage.setItem(
        `@Xati:lastMessage:${chatId}`,
        JSON.stringify(message),
      );
    }
  },

  getMessages: async (chatId: string) => {
    const allKeysStorage = await AsyncStorage.getAllKeys();
    const allMessagesKeys = allKeysStorage.filter(key =>
      new RegExp(chatId, 'gim').test(key),
    );

    const messagesString = await AsyncStorage.multiGet(
      allMessagesKeys,
    ).catch(error =>
      console.log('Erro ao pegar as mensagens no storage: ', error),
    );

    if (messagesString) {
      const messagesArray = messagesString.map(messageData => {
        if (messageData[1]) {
          return JSON.parse(messageData[1]);
        }
      });

      const messagesSorted = messagesArray.sort((a, b) => {
        return a.createdAt - b.createdAt;
      });

      const messages = messagesSorted.reduce((accumulator, current) => {
        if (
          !accumulator.some((message: IMessage) => message._id === current._id)
        ) {
          accumulator.push(current);
        }
        return accumulator;
      }, []);

      return messages as IMessage[];
    }
  },

  getLastMessage: async (chatId: string) => {
    return await AsyncStorage.getItem(`@Xati:lastMessage:${chatId}`)
      .then(message => {
        if (message) {
          return JSON.parse(message) as IMessage;
        }
        return undefined;
      })
      .catch(error => {
        console.log('Erro ao pegar ultima mensagem no AsyncStorage: ', error);
        return undefined;
      });
  },

  deleteMessages: async (chatId: string) => {
    await AsyncStorage.removeItem(`@Xati:${chatId}`).catch(error => {
      console.log('Erro ao deletar mensagens no AsyncStorage: ', error);
    });
  },
};

export default storage;
