import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Alert } from 'react-native';
import Modal from 'react-native-modal';
import apiFirebase from '../../database/apiFirebase';
import { useAuth } from '../../hooks/auth';
import formatTime from '../../utils/formatTime';

import {
  Container,
  BoxShadowProfile,
  Profile,
  ProfilePicture,
  LoadingView,
  NoMessageText,
  SearchUserMessageContainer,
  SearchUserMessageText,
  ArrowRightImage,
  ChatList,
  ChatContainer,
  ChatContent,
  ChatAvatar,
  ChatData,
  ChatName,
  ChatLastMessage,
  NewMessagesContainer,
  NewMessagesText,
  ChatIcon,
  BoxShadowButton,
  Button,
  NewChatImage,
  ModalContainer,
  ModalBar,
  ModalButton,
  ModalDeleteText,
  ModalCancelText,
  ModalSeparator,
  styles,
} from './styles';

export interface IChat {
  chatId: string;
  lastMessage?: {
    _id: string;
    createdAt: string;
    text: string;
    user: {
      _id: string;
      name: string;
      avatar?: string;
    };
  };
  newMessages?: number;
  user: {
    _id: string;
    name: string;
    avatar?: string;
  };
}

const Home: React.FC = () => {
  const { navigate } = useNavigation();
  const { user } = useAuth();

  const [chats, setChats] = useState<IChat[]>([]);
  const [chatsSorted, setChatsSorted] = useState<any>([]);
  const screenIsFocused = useIsFocused();
  const [updateLastMessage, setUpdateLastMessage] = useState(false);
  const [loading, setLoading] = useState(true);
  const [chatDeleted, setChatDeleted] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [chatDataDeleted, setChatDataDeleted] = useState<IChat | null>(null);

  useEffect(() => {
    const messagingToken = AsyncStorage.getItem('@Xati:MessagingToken').then(
      response => response,
    );

    if (messagingToken === null) {
      apiFirebase.getMessagingToken().then(async response => {
        if (response) {
          await apiFirebase.saveMessagingTokenStorage(response);
          apiFirebase.saveDeviceDatabase(response).then(() => {
            console.log(
              'Token gerado, salvado no banco de dados e no AsyncStorage',
            );
          });
        }
      });
    }
  }, []);

  useEffect(() => {
    if (screenIsFocused) {
      apiFirebase.getChatsData().then(chatsData => {
        if (chatsData) {
          setChats(chatsData);
          setLoading(false);
        }
        setLoading(false);
      });
    }

    apiFirebase.updateLastMessage(() => {
      setUpdateLastMessage(!updateLastMessage);
    });
  }, [screenIsFocused, updateLastMessage]);

  useEffect(() => {
    setChatsSorted(
      chats.sort((a, b) => {
        const varA = formatTime(a.lastMessage?.createdAt);
        const varB = formatTime(b.lastMessage?.createdAt);
        return varA - varB;
      }),
    );
  }, [chats]);

  const navigateToProfile = useCallback(() => {
    navigate('Profile');
  }, [navigate]);

  const navigateToChat = useCallback(
    (chatData: IChat) => {
      navigate('Chat', { chatData });
    },
    [navigate],
  );

  const navigateToSearchUser = useCallback(() => {
    navigate('SearchUser');
  }, [navigate]);

  const openDeleteChat = useCallback(async (chat: IChat) => {
    setModalVisible(true);
    setChatDataDeleted(chat);
  }, []);

  const closeDeleteChat = useCallback(() => {
    setModalVisible(false);
    setChatDataDeleted(null);
  }, []);

  const deleteChat = useCallback(async () => {
    if (chatDataDeleted) {
      const verifyChatDeleted = await apiFirebase.deleteChat(
        chatDataDeleted?.chatId,
        chatDataDeleted?.user._id,
      );

      if (verifyChatDeleted) {
        setChatDeleted(!chatDeleted);
        setModalVisible(false);

        const chatsFiltered = chats.filter(chat => {
          chat.chatId !== chatDataDeleted.chatId;
        });
        setChats(chatsFiltered);

        Alert.alert(
          'Chat deletado',
          `O chat com ${chatDataDeleted.user.name} foi deletado.`,
        );
      } else {
        Alert.alert('Erro ao deletar conversa', 'Tente novamente mais tarde');
      }
    }
  }, [chatDataDeleted, chatDeleted, chats]);

  return (
    <>
      <Container>
        <BoxShadowProfile style={styles.boxShadowProfile}>
          <Profile onPress={navigateToProfile}>
            {user.avatar ? (
              <ProfilePicture source={{ uri: user.avatar }} />
            ) : (
              <ProfilePicture
                source={require('../../assets/user-default.png')}
              />
            )}
          </Profile>
        </BoxShadowProfile>

        {loading && (
          <LoadingView>
            <ActivityIndicator size="large" color="#377DFF" />
          </LoadingView>
        )}

        {chats.length === 0 && (
          <>
            <NoMessageText>Nenhuma conversa encontrada</NoMessageText>

            <SearchUserMessageContainer>
              <SearchUserMessageText>
                Encontre usuários por aqui
              </SearchUserMessageText>
              <ArrowRightImage
                source={require('../../assets/right-arrow.png')}
              />
            </SearchUserMessageContainer>
          </>
        )}

        <ChatList
          showsVerticalScrollIndicator={false}
          inverted
          contentContainerStyle={styles.containerChatList}
          data={chatsSorted}
          extraData={chats}
          keyExtractor={chat => chat.chatId}
          renderItem={({ item: chat }) => (
            <ChatContainer
              onPress={() => navigateToChat(chat)}
              onLongPress={() => openDeleteChat(chat)}
            >
              <ChatContent>
                <ChatAvatar source={{ uri: chat.user.avatar }} />

                <ChatData>
                  <ChatName>{chat.user.name}</ChatName>
                  <ChatLastMessage numberOfLines={1}>
                    {chat.lastMessage?.text}
                  </ChatLastMessage>
                </ChatData>

                {chat.newMessages && (
                  <NewMessagesContainer>
                    <NewMessagesText>{chat.newMessages}</NewMessagesText>
                  </NewMessagesContainer>
                )}

                <ChatIcon source={require('../../assets/chevron-right.png')} />
              </ChatContent>
            </ChatContainer>
          )}
        />

        <BoxShadowButton style={styles.boxShadowButton}>
          <Button onPress={navigateToSearchUser}>
            <NewChatImage
              source={require('../../assets/floating-menu-icon.png')}
            />
          </Button>
        </BoxShadowButton>

        <Modal
          isVisible={modalVisible}
          onBackdropPress={() => setModalVisible(false)}
          backdropOpacity={0.5}
          style={styles.modal}
        >
          <ModalContainer style={styles.shadow}>
            <ModalBar
              onTouchStart={() => {
                setModalVisible(false);
              }}
            />

            <ModalButton onPress={() => deleteChat()}>
              <ModalDeleteText>Deletar conversa?</ModalDeleteText>
            </ModalButton>

            <ModalSeparator />

            <ModalButton onPress={() => closeDeleteChat()}>
              <ModalCancelText>Cancelar</ModalCancelText>
            </ModalButton>
          </ModalContainer>
        </Modal>
      </Container>
    </>
  );
};

export default Home;
