import React, { useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';
import { GiftedChat, IMessage } from 'react-native-gifted-chat';
import 'dayjs/locale/pt-br';
import auth from '@react-native-firebase/auth';

import { useTheme } from '../../hooks/theme';

import { Header } from '../../components/Header';
import { Input } from '../../components/Input';

import { Container } from './styles';

import SendIcon from '../../assets/chat/ic_send.png';

type User = {
  uid: string;
  name: string;
  avatarUrl: string;
};

export const Chat = () => {
  const { colors } = useTheme();

  const [user, setUser] = useState<User>();

  const [messages, setMessages] = useState<IMessage[]>([]);
  const [textMessage, setTextMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const onSend = useCallback(() => {
    const newMessage: IMessage = {
      _id: Math.random(),
      text: textMessage,
      createdAt: new Date(),
      user: {
        _id: 1,
        name: user?.name,
        avatar: user?.avatarUrl,
      },
    };

    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, [newMessage]),
    );

    setTextMessage('');
  }, [textMessage]);

  useEffect(() => {
    const userData = auth().currentUser;

    if (userData) {
      setUser({
        uid: userData.uid,
        name: userData.displayName ? userData.displayName : '',
        avatarUrl: userData.photoURL ? userData.photoURL : '',
      });
    }

    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ]);
  }, []);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setIsTyping(false);
    }, 700);

    return () => clearTimeout(delayDebounceFn);
  }, [textMessage]);

  return (
    <Container backgroundColor={colors.appBackground}>
      <Header
        title={user?.name}
        translateXTitle={
          -1 * ((user?.name.length ? user?.name.length : 0) * 4.5)
        }
        imageUrl={user?.avatarUrl}
      />

      <View style={{ flex: 1, width: '100%', marginBottom: 20 }}>
        <GiftedChat
          messages={messages}
          user={{
            _id: 1,
            name: user?.name,
            avatar: user?.avatarUrl,
          }}
          isTyping={isTyping}
          locale="pt-br"
          renderInputToolbar={props => (
            <Input
              containerStyle={{ width: '90%', alignSelf: 'center' }}
              iconSource={SendIcon}
              iconCallback={onSend}
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
