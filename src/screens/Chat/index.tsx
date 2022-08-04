import React, { useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';
import { GiftedChat, IMessage } from 'react-native-gifted-chat';
import 'dayjs/locale/pt-br';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import database from '@react-native-firebase/database';
import uuid from 'react-native-uuid';

import { useTheme } from '../../hooks/theme';
import { useChat } from '../../hooks/chat';

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
  const [isTyping, setIsTyping] = useState(false);

  const onSend = useCallback(async () => {
    const newMessage: IMessage = {
      _id: Math.random(),
      text: textMessage,
      createdAt: Date.now(),
      user: {
        _id: user?.uid ? user?.uid : 567,
        name: user?.name,
        avatar: user?.photoUrl,
      },
    };

    if (user && userSelected) {
      if (chatId) {
        await database().ref(`/chats/${chatId}`).push().set(newMessage);
        await firestore()
          .collection('chatsData')
          .doc(chatId)
          .update({
            lastMessage: newMessage,
            [userSelected.uid]: firestore.FieldValue.increment(1),
          });
      } else {
        const newChatId = uuid.v4().toString();

        const chatData = {
          usersId: [user?.uid, userSelected?.uid],
          users: [user, userSelected],
          chatId: newChatId,
          lastMessage: newMessage,
          [userSelected.uid]: firestore.FieldValue.increment(1),
        };

        await firestore().collection('chatsData').add(chatData);
        setChatId(newChatId);

        await firestore()
          .collection('users')
          .doc(user?.uid)
          .update({
            chatsId: firestore.FieldValue.arrayUnion(newChatId),
          });

        await database().ref(`/chats/${newChatId}`).push().set(newMessage);
      }
    }

    setTextMessage('');
  }, [user, userSelected, chatId, textMessage]);

  const clearNotifications = useCallback(() => {
    if (user && chatId) {
      firestore()
        .collection('chatsData')
        .doc(chatId)
        .update({
          [user.uid]: 0,
        });
    }
  }, [user, chatId]);

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
    if (chatId) {
      const onValueChange = database()
        .ref(`/chats/${chatId}`)
        .on('value', snapshot => {
          if (snapshot.exists()) {
            const messagesUpdated = Object.values(snapshot.val()) as IMessage[];

            setMessages(
              messagesUpdated.sort(
                (a, b) => Number(b.createdAt) - Number(a.createdAt),
              ),
            );
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

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setIsTyping(false);
    }, 700);

    return () => clearTimeout(delayDebounceFn);
  }, [textMessage]);

  return (
    <Container backgroundColor={colors.appBackground}>
      <Header title={userSelected?.name} imageUrl={userSelected?.photoUrl} />

      <View style={{ flex: 1, width: '100%', marginBottom: 20 }}>
        <GiftedChat
          messages={messages}
          user={{
            _id: user?.uid ? user?.uid : 567,
            name: user?.name,
            avatar: user?.photoUrl,
          }}
          isTyping={isTyping}
          locale="pt-br"
          renderAvatar={() => null}
          showAvatarForEveryMessage={true}
          renderInputToolbar={props => (
            <Input
              containerStyle={{ width: '90%', alignSelf: 'center' }}
              iconSource={SendIcon}
              iconCallback={async () => await onSend()}
              value={textMessage}
              onChangeText={text => {
                setIsTyping(true);
                setTextMessage(text);
              }}
              {...props}
            />
          )}
        />
      </View>
    </Container>
  );
};
