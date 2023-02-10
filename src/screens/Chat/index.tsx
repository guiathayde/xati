import React, { useCallback, useEffect, useState } from 'react';
import { Button, View } from 'react-native';
import { GiftedChat, IMessage } from 'react-native-gifted-chat';
import 'dayjs/locale/pt-br';
import notifee from '@notifee/react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import database, {
  FirebaseDatabaseTypes,
} from '@react-native-firebase/database';
import uuid from 'react-native-uuid';

import { useTheme } from '../../hooks/theme';
import { useChat } from '../../hooks/chat';

import { listenNewMessage } from '../../database/business/services/listenNewMessages';
import { getAllMessages } from '../../database/business/services/getAllMessages';
import { writeMessages } from '../../database/business/services/writeMessages';

import { Header } from '../../components/Header';
import { Input } from '../../components/Input';

import { Container } from './styles';

import SendIcon from '../../assets/chat/ic_send.png';
import { sendNotificationToFirebase } from '../../services/Notifications';

type User = {
  uid: string;
  name: string;
  photoUrl: string;
  fcmToken?: string;
};

export const Chat = () => {
  const { colors } = useTheme();
  const { userSelected, chatId, setChatId } = useChat();

  const [user, setUser] = useState<User>();
  const [userSelectedFCMToken, setUserSelectedFCMToken] = useState<string>();

  const [messages, setMessages] = useState<IMessage[]>([]);
  const [textMessage, setTextMessage] = useState('');

  const sendMessageToFirebaseDatabase = useCallback(
    async (newMessage: IMessage) => {
      if (user && userSelected) {
        if (chatId) {
          await database().ref(`/chats/${chatId}`).push().set(newMessage);
          await firestore()
            .collection('chatsData')
            .where('chatId', '==', chatId)
            .get()
            .then(querySnapshot => {
              querySnapshot.forEach(async doc => {
                await firestore()
                  .collection('chatsData')
                  .doc(doc.id)
                  .update({
                    lastMessage: newMessage,
                    [userSelected.uid]: firestore.FieldValue.increment(1),
                  });
              });
            });
        } else {
          const newChatId = uuid.v4().toString();

          const chatData = {
            usersId: [user?.uid, userSelected?.uid],
            users: [user, userSelected],
            chatId: newChatId,
            lastMessage: newMessage,
            [userSelected.uid]: 1,
            [user?.uid]: 0,
          };

          await firestore().collection('chatsData').add(chatData);
          setChatId(newChatId);

          await database().ref(`/chats/${newChatId}`).push().set(newMessage);
        }

        if (userSelectedFCMToken)
          sendNotificationToFirebase(
            user.name,
            userSelectedFCMToken,
            newMessage.text,
          );
        else console.error('userSelectedFCMToken is undefined');
      }
    },
    [user, userSelected, chatId, userSelectedFCMToken],
  );

  const onSend = useCallback(async () => {
    const newMessage: IMessage = {
      _id: uuid.v4().toString(),
      text: textMessage,
      createdAt: Date.now(),
      user: {
        _id: user?.uid ? user?.uid : 567,
        name: user?.name,
        avatar: user?.photoUrl,
      },
    };

    await sendMessageToFirebaseDatabase(newMessage);

    setTextMessage('');
  }, [user, userSelected, chatId, textMessage]);

  const clearNotifications = useCallback(() => {
    if (user && chatId) {
      firestore()
        .collection('chatsData')
        .where('chatId', '==', chatId)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(async doc => {
            await firestore()
              .collection('chatsData')
              .doc(doc.id)
              .update({
                [user.uid]: 0,
              });
          });
        });
    }
  }, [user, chatId]);

  const getMessagesFromLocalDatabase = useCallback(async () => {
    if (chatId) {
      const messages = await getAllMessages(chatId);
      console.log(JSON.stringify(messages));
    }
  }, [chatId]);

  async function onSnapshotReceivedFromFirebase(
    chatId: string | undefined,
    snapshot: FirebaseDatabaseTypes.DataSnapshot,
  ) {
    if (chatId && snapshot.exists()) {
      const oldMessages = Object.values(snapshot.val()) as IMessage[];

      await writeMessages(chatId, oldMessages);

      const oldMessagesSorted = oldMessages.sort(
        (a, b) => Number(b.createdAt) - Number(a.createdAt),
      );

      return oldMessagesSorted[0];
    }
  }

  function listenNewMessagesFromFirebaseDatabase(
    chatId: string | undefined,
    timeLastMessage: number | undefined,
  ) {
    if (chatId) {
      if (timeLastMessage) {
        return database()
          .ref(`/chats/${chatId}`)
          .orderByChild('createdAt')
          .startAt(timeLastMessage + 2)
          .limitToLast(1)
          .on('child_added', async snapshot => {
            if (snapshot.exists()) {
              const messageUpdated = snapshot.val() as IMessage;

              await writeMessages(chatId, [messageUpdated]);
            }
          });
      }

      return database()
        .ref(`/chats/${chatId}`)
        .limitToLast(1)
        .on('child_added', async snapshot => {
          if (snapshot.exists()) {
            const messageUpdated = snapshot.val() as IMessage;

            await writeMessages(chatId, [messageUpdated]);
          }
        });
    }
  }

  useEffect(() => {
    const userData = auth().currentUser;

    if (userData) {
      setUser({
        uid: userData.uid,
        name: userData.displayName ? userData.displayName : '',
        photoUrl: userData.photoURL ? userData.photoURL : '',
      });
    }

    if (userSelected)
      firestore()
        .collection('users')
        .doc(userSelected.uid)
        .get()
        .then(doc => {
          if (doc.exists) {
            const userSelectedData = doc.data() as User;
            setUserSelectedFCMToken(userSelectedData.fcmToken);
          }
        });
  }, [userSelected]);

  useEffect(() => {
    if (chatId) {
      let onChangeValue:
        | ((
            a: FirebaseDatabaseTypes.DataSnapshot | null,
            b?: string | null | undefined,
          ) => void)
        | undefined;

      getAllMessages(chatId).then(oldMessagesStored => {
        if (oldMessagesStored.length > 0) {
          const oldMessages = Array.from(oldMessagesStored) as IMessage[];
          const oldMessagesSorted = oldMessages.sort(
            (a, b) => Number(b.createdAt) - Number(a.createdAt),
          );
          setMessages(oldMessagesSorted);

          const timestapmLastMessage = Number(oldMessagesSorted[0].createdAt);

          database()
            .ref(`/chats/${chatId}`)
            .orderByChild('createdAt')
            .startAt(timestapmLastMessage + 2)
            .once('value', async snapshot => {
              await onSnapshotReceivedFromFirebase(chatId, snapshot);

              const timeLastMessage = oldMessagesSorted[0]
                ? Number(oldMessagesSorted[0].createdAt)
                : undefined;

              onChangeValue = listenNewMessagesFromFirebaseDatabase(
                chatId,
                timeLastMessage,
              );
            });
        } else {
          database()
            .ref(`/chats/${chatId}`)
            .once('value', async snapshot => {
              await onSnapshotReceivedFromFirebase(chatId, snapshot);

              onChangeValue = listenNewMessagesFromFirebaseDatabase(
                chatId,
                undefined,
              );
            });
        }
      });

      let messagesListenerLocalDatabase: Realm.Results<Realm.Object>;
      listenNewMessage(chatId, newMessage => {
        setMessages(previousMessages =>
          GiftedChat.append(previousMessages, [newMessage]),
        );
      }).then(messagesListener => {
        messagesListenerLocalDatabase = messagesListener;
      });

      return () => {
        database().ref(`/chats/${chatId}`).off('child_added');
        messagesListenerLocalDatabase.removeAllListeners();
      };
    }
  }, [chatId]);

  useEffect(() => {
    clearNotifications();

    return () => clearNotifications();
  }, [user, chatId]);

  return (
    <Container backgroundColor={colors.appBackground}>
      <Header title={userSelected?.name} imageUrl={userSelected?.photoUrl} />

      {/* <Button
        title="Read Realm Database"
        onPress={async () => {
        }}
      /> */}

      <View style={{ flex: 1, width: '100%', marginTop: 16, marginBottom: 8 }}>
        <GiftedChat
          messages={messages}
          user={{
            _id: user?.uid ? user?.uid : 567,
            name: user?.name,
            avatar: user?.photoUrl,
          }}
          locale="pt-br"
          renderAvatar={() => null}
          showAvatarForEveryMessage={true}
          renderInputToolbar={props => (
            <Input
              containerStyle={{ width: '90%', alignSelf: 'center' }}
              iconSource={SendIcon}
              iconCallback={async () => await onSend()}
              value={textMessage}
              onChangeText={setTextMessage}
              {...props}
            />
          )}
        />
      </View>
    </Container>
  );
};
