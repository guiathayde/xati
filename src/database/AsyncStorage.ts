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
    const verifyChat = await AsyncStorage.getItem(`@Xati:${chatId}`);

    if (verifyChat !== null) {
      await AsyncStorage.setItem(
        `@Xati:${chatId}`,
        JSON.stringify(message),
      ).catch(error => {
        console.log('Erro ao salvar primeira mensagem: ', error);
      });
    }

    await AsyncStorage.mergeItem(
      `@Xati:${chatId}`,
      JSON.stringify(message),
    ).catch(error => {
      console.log('Erro em salvar mensagem no AsyncStorage: ', error);
    });
  },

  getMessages: async (chatId: string) => {
    return await AsyncStorage.getItem(`@Xati:${chatId}`)
      .then(response => {
        if (response) {
          return JSON.parse(response) as IMessage[];
        }
      })
      .catch(error => {
        console.log('Erro ao pegar as mensagens no AsyncStorage: ', error);
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
