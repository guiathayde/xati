import React, { useCallback, useEffect, useState } from 'react';
import { Button, View } from 'react-native';
import { GiftedChat, IMessage } from 'react-native-gifted-chat';
import 'dayjs/locale/pt-br';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import database from '@react-native-firebase/database';
import uuid from 'react-native-uuid';

import { useTheme } from '../../hooks/theme';
import { useChat } from '../../hooks/chat';

import { writeMessage } from '../../database/business/services/writeMessage';
import { getAllMessages } from '../../database/business/services/getAllMessages';
import { writeOldMessages } from '../../database/business/services/writeOldMessages';

import { Header } from '../../components/Header';
import { Input } from '../../components/Input';

import { Container } from './styles';

import SendIcon from '../../assets/chat/ic_send.png';

type User = {
  uid: string;
  name: string;
  photoUrl: string;
};

export const Chat = () => {
  const { colors } = useTheme();
  const { userSelected, chatId, setChatId } = useChat();

  const [user, setUser] = useState<User>();

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
      }
    },
    [user, userSelected, chatId],
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
    if (chatId) console.log(await writeMessage(chatId, newMessage));

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

  useEffect(() => {
    const userData = auth().currentUser;

    if (userData) {
      setUser({
        uid: userData.uid,
        name: userData.displayName ? userData.displayName : '',
        photoUrl: userData.photoURL ? userData.photoURL : '',
      });
    }
  }, []);

  useEffect(() => {
    console.log('chatId', chatId);
    if (chatId) {
      const onValueChange = database()
        .ref(`/chats/${chatId}`)
        .on('value', async snapshot => {
          if (snapshot.exists()) {
            const messagesUpdated = Object.values(snapshot.val()) as IMessage[];
            const messagesUpdatedSorted = messagesUpdated.sort(
              (a, b) => Number(b.createdAt) - Number(a.createdAt),
            );

            console.log(await writeOldMessages(chatId, messagesUpdatedSorted));

            setMessages(messagesUpdatedSorted);
            // setMessages(previousMessages =>
            //   GiftedChat.append(previousMessages, messagesUpdated),
            // );
          }
        });

      return () =>
        database().ref(`/chats/${chatId}`).off('value', onValueChange);
    }
  }, [chatId]);

  useEffect(() => {
    clearNotifications();

    return () => clearNotifications();
  }, [user, chatId]);

  return (
    <Container backgroundColor={colors.appBackground}>
      <Header title={userSelected?.name} imageUrl={userSelected?.photoUrl} />

      <Button
        title="Read Realm Database"
        onPress={async () => {
          await getMessagesFromLocalDatabase();
        }}
      />

      <View style={{ flex: 1, width: '100%', marginTop: 16, marginBottom: 20 }}>
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
