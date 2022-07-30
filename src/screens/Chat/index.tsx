import React, { useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';
import { GiftedChat, IMessage } from 'react-native-gifted-chat';
import 'dayjs/locale/pt-br';

import { useTheme } from '../../hooks/theme';

import { Header } from '../../components/Header';
import { Input } from '../../components/Input';

import { Container } from './styles';

import SendIcon from '../../assets/chat/ic_send.png';

export const Chat = () => {
  const { colors } = useTheme();

  const [messages, setMessages] = useState<IMessage[]>([]);
  const [textMessage, setTextMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const title = 'Annette Black';

  const onSend = useCallback(() => {
    const newMessage: IMessage = {
      _id: Math.random(),
      text: textMessage,
      createdAt: new Date(),
      user: {
        _id: 1,
        name: 'React Native',
        avatar: 'https://placeimg.com/140/140/any',
      },
    };

    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, [newMessage]),
    );

    setTextMessage('');
  }, [textMessage]);

  useEffect(() => {
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
        title={title}
        translateXTitle={-1 * (title.length * 4.5)}
        imageUrl="https://source.unsplash.com/XAo09LtQiAQ/300x300"
      />

      <View style={{ flex: 1, width: '100%', marginBottom: 20 }}>
        <GiftedChat
          messages={messages}
          user={{
            _id: 1,
            name: title,
            avatar: 'https://source.unsplash.com/XAo09LtQiAQ/300x300',
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
