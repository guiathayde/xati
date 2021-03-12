import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import { Alert } from 'react-native';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { GiftedChat, IMessage } from 'react-native-gifted-chat';
import customComposer from '../../components/CustomStylesGiftedChat/customComposer';
import customtInputToolbar from '../../components/CustomStylesGiftedChat/customInputTollbar';
import customSend from '../../components/CustomStylesGiftedChat/customSend';
import apiFirebase from '../../database/apiFirebase';
import { useAuth } from '../../hooks/auth';

import {
  Container,
  Header,
  BackButton,
  BackIcon,
  BackButtonText,
  ChatNameText,
  ChatProfileImage,
} from './styles';

interface ParamsData {
  chatData: {
    chatId: string;
    user: {
      _id: string;
      name: string;
      avatar: string;
    };
  };
  selectedUser: {
    _id: string;
    name: string;
    avatar?: string;
  };
}

const Chat: React.FC = () => {
  const { user } = useAuth();

  const { navigate } = useNavigation();
  const route = useRoute();

  const selectedChat = route.params as ParamsData;

  const [messages, setMessages] = useState<IMessage[]>([]);

  useEffect(() => {
    apiFirebase.updateMessages(
      selectedChat.chatData.chatId,
      (message: IMessage[]) => {
        apiFirebase.removeNewMessagesChatData(selectedChat.chatData.chatId);

        setMessages(previousMessages =>
          GiftedChat.append(previousMessages, message),
        );
      },
    );
  }, [selectedChat.chatData.chatId]);

  const onSend = useCallback(
    async (newMessages = []) => {
      if (!messages.length) {
        await apiFirebase.saveChatId(
          selectedChat.selectedUser,
          selectedChat.chatData.chatId,
        );
      }

      await newMessages.forEach(async (message: IMessage) => {
        message.createdAt = new Date().getTime();

        const response = await apiFirebase.createMessage(
          selectedChat.chatData.user._id,
          selectedChat.chatData.chatId,
          message,
        );

        if (!response) {
          Alert.alert('Erro ao enviar a mensagem', 'Tente novamente');
        }

        await apiFirebase.sendNotification(
          selectedChat.chatData.user,
          message.text,
        );
      });
    },
    [
      selectedChat.chatData.chatId,
      selectedChat.chatData.user,
      messages.length,
      selectedChat.selectedUser,
    ],
  );

  const navigateToHome = useCallback(() => {
    navigate('Home');
  }, [navigate]);

  return (
    <>
      <Container>
        <Header>
          <BackButton onPress={navigateToHome}>
            <BackIcon source={require('../../assets/back-icon.png')} />
            <BackButtonText>Voltar</BackButtonText>
          </BackButton>

          <ChatNameText>{selectedChat.chatData.user.name}</ChatNameText>

          <ChatProfileImage
            source={{ uri: selectedChat.chatData.user.avatar }}
          />
        </Header>

        <GiftedChat
          messages={messages}
          onSend={message => onSend(message)}
          user={user}
          renderComposer={props => customComposer(props)}
          renderInputToolbar={props => customtInputToolbar(props)}
          renderSend={props => customSend(props)}
        />
      </Container>
    </>
  );
};

export default Chat;
