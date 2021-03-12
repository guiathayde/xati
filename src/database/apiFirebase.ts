import firebase from './database';
import messaging from '@react-native-firebase/messaging';

import { getBrand, getModel } from 'react-native-device-info';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
// import storage from './AsyncStorage';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { IMessage } from 'react-native-gifted-chat';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { IChat } from '../pages/Home';

interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
}

interface UserData {
  _id: string;
  name: string;
  avatar?: string;
}

interface ChatData {
  chatId: string;
  lastMessage?: string | null;
  user: {
    _id: string;
    name: string;
    avatar?: string;
  };
}

interface lastMessageData {
  _id: string;
  createdAt: string;
  text: string;
}

const apiFirebase = {
  findUserByName: async (name: string): Promise<UserData[] | null> => {
    const usersName = await firebase.database().ref('users').get();

    if (usersName.exists()) {
      let usersNameFiltered = Object.values(usersName.val()).filter(item =>
        new RegExp(name, 'gim').test(item.name),
      );

      return usersNameFiltered as UserData[];
    } else {
      return null;
    }
  },

  updateAvatarDatabase: async (imageURL: string) => {
    const currentUser = await apiFirebase.currentUser();

    await firebase
      .database()
      .ref(`users/${currentUser?.uid}`)
      .update({
        avatar: imageURL,
      })
      .catch(error =>
        console.log(
          'Erro ao atualizar foto de perfil no banco de dados: ',
          error,
        ),
      );
  },

  createUser: async (name: string, email: string, password: string) => {
    return await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(async () => {
        await apiFirebase.updateProfileName(name);

        const currentUser = await apiFirebase.currentUser();

        const userDatabase = {
          _id: currentUser?.uid,
          name: currentUser?.displayName,
          avatar: currentUser?.photoURL,
        };

        await firebase
          .database()
          .ref(`users/${userDatabase._id}`)
          .set(userDatabase);

        return true;
      })
      .catch(() => {
        console.log('Erro ao fazer cadastro');
        return false;
      });
  },

  uploadProfilePhoto: async (pathFile: string) => {
    const response = await fetch(pathFile);
    const blob = await response.blob();

    const currentUser = await apiFirebase.currentUser();

    await firebase.storage().ref(`${currentUser?.uid}`).put(blob);

    const imageURL = await firebase
      .storage()
      .ref(`${currentUser?.uid}`)
      .getDownloadURL();

    await currentUser?.updateProfile({
      photoURL: imageURL,
    });

    return imageURL as string;
  },

  signInAuthentication: async (email: string, password: string) => {
    const signIn = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        return true;
      })
      .catch(error => {
        console.log('Erro ao fazer login: ', error);
        return false;
      });

    return signIn;
  },

  forgotPassword: async (email: string) => {
    return await firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        return true;
      })
      .catch(error => {
        console.log('Erro ao recuperar senha: ', error);
        return false;
      });
  },

  currentUser: async () => {
    const currentUser = await firebase.auth().currentUser;

    if (currentUser) {
      return currentUser;
    }
  },

  updateProfileName: async (name: string) => {
    const updateProfile = await firebase
      .auth()
      .currentUser?.updateProfile({
        displayName: name,
      })
      .then(async () => {
        const currentUser = await apiFirebase.currentUser();
        await firebase.database().ref(`users/${currentUser?.uid}`).update({
          name,
        });

        console.log('Nome de perfil atualizado com sucesso');
        return true;
      })
      .catch(error => {
        console.log('Erro ao atualizar nome de perfil');
        console.log(error);
        return false;
      });

    return updateProfile;
  },

  signOutAuthentication: async () => {
    return await firebase
      .auth()
      .signOut()
      .then(() => true)
      .catch(error => {
        console.log('Erro ao fazer logout: ', error);
        return false;
      });
  },

  saveChatId: async (selectedUser: UserData, chatId: string) => {
    const currentUser = await apiFirebase.currentUser();

    const currentUserSave = {
      chatId,
      user: {
        _id: selectedUser._id,
        name: selectedUser.name,
      },
    };

    const selectedUserSave = {
      chatId,
      user: {
        _id: currentUser?.uid,
        name: currentUser?.displayName,
      },
    };

    await firebase
      .database()
      .ref(`users/${currentUser?.uid}/chatsId/${chatId}`)
      .set(currentUserSave)
      .catch(error =>
        console.log('Erro ao salvar o chatId do usuário: ', error),
      );

    await firebase
      .database()
      .ref(`users/${selectedUser._id}/chatsId/${chatId}`)
      .set(selectedUserSave)
      .catch(error =>
        console.log('Erro ao salvar o chatId do usuário selecionado: ', error),
      );
  },

  createMessage: async (
    selectedUserId: string,
    chatId: string,
    message: IMessage,
  ) => {
    await apiFirebase.saveLastMessage(selectedUserId, chatId, message);

    return await firebase
      .database()
      .ref(`chats/${chatId}`)
      .push(message)
      .then(async () => {
        // await storage.saveMessage(chatId, message);
        await firebase
          .database()
          .ref(`users/${selectedUserId}/new-messages/${chatId}`)
          .push('new message');
        return true;
      })
      .catch(() => {
        return false;
      });
  },

  loadLastMessages: async (chatId: string, callback: Function) => {
    await firebase
      .database()
      .ref(`chats/${chatId}`)
      .limitToLast(100)
      .once('value', snapshot => {
        const { _id, createdAt, text, user } = snapshot.val();

        const message = { _id, createdAt, text, user };

        callback(message);
      });
  },

  updateMessages: async (chatId: string, callback: Function) => {
    await firebase
      .database()
      .ref(`chats/${chatId}`)
      .on('child_added', snapshot => {
        const { _id, createdAt, text, user } = snapshot.val();

        const message = { _id, createdAt, text, user };

        callback(message);
      });
  },

  getChatsData: async (): Promise<IChat[] | undefined> => {
    const currentUser = await apiFirebase.currentUser();

    const chatsData = await firebase
      .database()
      .ref(`users/${currentUser?.uid}/chatsId`)
      .once('value');

    if (chatsData.exists()) {
      const chatsDataArray = Object.values(chatsData.val()) as IChat[];

      const updateChatsDataArray = chatsDataArray.map(async chatData => {
        const selectedAvatar = await apiFirebase.getSelectedUserAvatar(
          chatData.user._id,
        );

        const newMessages = await apiFirebase.getNewMessagesChatData(
          chatData.chatId,
        );

        chatData = {
          chatId: chatData.chatId,
          lastMessage: chatData.lastMessage,
          newMessages: newMessages,
          user: {
            _id: chatData.user._id,
            name: chatData.user.name,
            avatar: selectedAvatar,
          },
        };

        return chatData;
      });

      return await Promise.all(updateChatsDataArray);
    }
  },

  getNewMessagesChatData: async (chatId: string) => {
    const currentUser = await apiFirebase.currentUser();

    const response = await firebase
      .database()
      .ref(`users/${currentUser?.uid}/new-messages/${chatId}`)
      .get();

    if (response.exists()) {
      return Object.values(response.val()).length;
    }

    return;
  },

  removeNewMessagesChatData: async (chatId: string) => {
    const currentUser = await apiFirebase.currentUser();

    await firebase
      .database()
      .ref(`users/${currentUser?.uid}/new-messages/${chatId}`)
      .remove();
  },

  getChatDataByChatId: async (chatId: string) => {
    const currentUser = await apiFirebase.currentUser();

    const chatData = await firebase
      .database()
      .ref(`users/${currentUser?.uid}/chatsId/${chatId}`)
      .once('value');

    return Object.values(chatData.val()) as IChat[];
  },

  verifyChat: async (selectedUserName: string) => {
    const currentUser = await apiFirebase.currentUser();

    const chatsData = await firebase
      .database()
      .ref(`users/${currentUser?.uid}/chatsId`)
      .once('value');

    const chatsDataArray = Object.values(chatsData.val()) as IChat[];

    const chatsDataArrayFiltered = chatsDataArray.filter(item => {
      return item.user.name === selectedUserName;
    });

    if (chatsDataArrayFiltered.length) {
      const chatData = {
        chatId: chatsDataArrayFiltered[0].chatId,
        user: {
          _id: chatsDataArrayFiltered[0].user._id,
          name: chatsDataArrayFiltered[0].user.name,
          avatar: chatsDataArrayFiltered[0].user.avatar,
        },
      };

      return chatData;
    }

    return null;
  },

  getSelectedUserAvatar: async (selectedId: string): Promise<string> => {
    return await firebase.storage().ref(`${selectedId}`).getDownloadURL();
  },

  saveLastMessage: async (
    selectedUserId: string,
    chatId: string,
    message: IMessage,
  ) => {
    const currentUser = await apiFirebase.currentUser();

    await firebase
      .database()
      .ref(`users/${currentUser?.uid}/chatsId/${chatId}`)
      .update({ lastMessage: message });

    await firebase
      .database()
      .ref(`users/${selectedUserId}/chatsId/${chatId}`)
      .update({ lastMessage: message });
  },

  updateLastMessage: async (callback: Function) => {
    const currentUser = await apiFirebase.currentUser();

    await firebase
      .database()
      .ref(`users/${currentUser?.uid}/chatsId`)
      .on('child_changed', () => {
        return callback();
      });
  },

  getMessagingToken: async () => {
    return await messaging()
      .getToken()
      .then((response: string) => {
        return response;
      })
      .catch(error => {
        console.log(error);
      });
  },

  saveMessagingTokenStorage: async (token: string) => {
    await AsyncStorage.setItem('@Xati:MessagingToken', token);
  },

  saveDeviceDatabase: async (token: string) => {
    const currentUser = await apiFirebase.currentUser();

    await firebase
      .database()
      .ref(`users/${currentUser?.uid}/device`)
      .set({
        brand: getBrand(),
        model: getModel(),
        token,
      })
      .catch(error => {
        console.log('Erro ao salvar informações do dispositivo: ', error);
      });
  },

  getMessagingTokenFromDatabase: async () => {
    const currentUser = await apiFirebase.currentUser();

    return await firebase
      .database()
      .ref(`users/${currentUser?.uid}/device/token`)
      .get();
  },

  getMessagingTokenFromSelectedUser: async (selectedUserId: string) => {
    return await firebase
      .database()
      .ref(`users/${selectedUserId}/device/token`)
      .get();
  },

  sendNotification: async (selectedUser: UserData, message: string) => {
    const token = await apiFirebase.getMessagingTokenFromSelectedUser(
      selectedUser._id,
    );

    const currentUser = await apiFirebase.currentUser();

    await axios
      .post(
        'https://fcm.googleapis.com/fcm/send',
        {
          to: token,
          data: {
            title: `${currentUser?.displayName}`,
            body: message,
            avatar_url: currentUser?.photoURL,
          },
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization:
              'key=AAAAs6EMtUk:APA91bFGk2WIrqFtEtPKOkyIoV3Iz8OnWIpgJCEZb0fNyydx7u-ZuE0qwSCFf02xv7lExT6zLdvbArsOYzEjgm7wuTrgvPrObxBtyZTOTs0nNSPrUjCTsxQG2uXu3r_vWTmAlKTOsYdN',
          },
        },
      )
      .then(() => {
        console.log('Notificação de nova mensagem enviada.');
      })
      .catch(error => {
        console.log('Deu erro a notificação: ', error);
      });
  },

  deleteChat: async (chatId: string, selectedUserId: string) => {
    return await firebase
      .database()
      .ref(`chats/${chatId}`)
      .remove()
      .then(async () => {
        const currentUser = await apiFirebase.currentUser();

        await firebase
          .database()
          .ref(`users/${currentUser?.uid}/chatsId/${chatId}`)
          .remove()
          .catch(error => {
            console.log('Erro ao deletar o chatId do usuário: ', error);
            return false;
          });

        await firebase
          .database()
          .ref(`users/${selectedUserId}/chatsId/${chatId}`)
          .remove()
          .catch(error => {
            console.log(
              'Erro ao deletar o chatId do usuário selecionado: ',
              error,
            );
            return false;
          });

        return true;
      })
      .catch(error => {
        console.log('Erro ao deletar Chat: ', error);
        return false;
      });
  },
};

export default apiFirebase;
