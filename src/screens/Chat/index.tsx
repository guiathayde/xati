import React, { useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';
import { GiftedChat, IMessage } from 'react-native-gifted-chat';
import 'dayjs/locale/pt-br';
import auth from '@react-native-firebase/auth';

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
  const { userSelected } = useChat();

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
        _id: user?.uid ? user?.uid : 567,
        name: user?.name,
        avatar: user?.photoUrl,
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
        photoUrl: userData.photoURL ? userData.photoURL : '',
      });
    }

    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: userSelected?.uid ? userSelected?.uid : 890,
          name: userSelected?.name,
          avatar: userSelected?.photoUrl,
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
        imageUrl={userSelected?.photoUrl}
      />

      <View style={{ flex: 1, width: '100%', marginBottom: 20 }}>
        <GiftedChat
          messages={messages}
          user={{
            _id: 1,
            name: user?.name,
            avatar: user?.photoUrl,
          }}
          isTyping={isTyping}
          locale="pt-br"
          renderAvatar={() => null}
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
