import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/en';
import 'dayjs/locale/pt-br';

import { useAuth } from '../../hooks/auth';
import { useSocket } from '../../hooks/socket';
import { useFirebase } from '../../hooks/firebase';
import { useTranslate } from '../../hooks/translate';
import { useColorMode } from '../../hooks/colorMode';

import { api } from '../../services/api';

import { Container } from '../../components/Container';
import { ToastyContainer } from '../../components/ToastyContainer';

import {
  ProfileButton,
  BoldText,
  ArrowRight,
  FloatingButton,
  ChatList,
  ChatContainer,
  ToastyContent,
} from './styles';

import { User } from '../../interfaces/User';
import { Message } from '../../interfaces/Message';

import profileDefaultLight from '../../assets/shared/profileDefaultLight.svg';
import profileDefaultDark from '../../assets/shared/profileDefaultDark.svg';

interface Chat {
  id: string;
  users: User[];
  messages: Message[];
  totalMessagesUnread: number;
}

export function Dashboard() {
  const { user } = useAuth();
  const { socket } = useSocket();
  const { notificationPermission, askNotificationPermission } = useFirebase();
  const { language, strings } = useTranslate();
  const { mode, colors } = useColorMode();
  const navigate = useNavigate();

  dayjs.locale(language === 'en' ? 'en' : 'pt-br');
  dayjs.extend(relativeTime);

  const [chats, setChats] = useState<Chat[]>([]);

  const profileSrc = useMemo(() => {
    if (user && user.photoUrl) return user.photoUrl;
    if (mode === 'light') return profileDefaultLight;
    return profileDefaultDark;
  }, [mode, user]);

  const profileUserToChatSrc = useCallback(
    (userToChat: User) => {
      if (userToChat && userToChat.photoUrl) return userToChat.photoUrl;
      if (mode === 'light') return profileDefaultLight;
      return profileDefaultDark;
    },
    [mode],
  );

  useEffect(() => {
    if (user)
      api
        .get('/chat-rooms/user/' + user.id)
        .then(response => {
          setChats(response.data);
        })
        .catch(err => console.error(err));
  }, [user]);

  useEffect(() => {
    if (user)
      socket.emit('updateIsOnline', {
        userId: user.id,
        isOnline: true,
      });

    function handleNewChat(newChat: Chat) {
      setChats(oldChats => [...oldChats, newChat]);
    }
    function handleUpdateChat(updatedChat: Chat) {
      setChats(oldChats =>
        oldChats.map(chat => {
          if (chat.id === updatedChat.id) return updatedChat;
          return chat;
        }),
      );
    }

    socket.on('newChat', handleNewChat);
    socket.on('updateChat', handleUpdateChat);

    return () => {
      socket.off('newChat', handleNewChat);
      socket.off('updateChat', handleUpdateChat);
    };
  }, [socket, user]);

  return (
    <Container>
      <ProfileButton
        src={profileSrc}
        alt={user?.name}
        onClick={() => navigate('/profile')}
      />

      {chats.length > 0 && (
        <ChatList>
          {chats.map(chat => (
            <ChatContainer
              key={chat.id}
              to={'/chat/' + chat.users[0].id}
              style={{
                borderBottomColor:
                  colors.dashboard.chatContainerBottomBorderColor,
              }}
            >
              <img src={profileUserToChatSrc(chat.users[0])} alt="Profile" />

              <div className="name-last-message">
                <span
                  style={{
                    color: colors.dashboard.chatNameColor,
                  }}
                >
                  {chat.users[0].name}
                </span>
                {chat.messages.length > 0 && (
                  <p style={{ color: colors.dashboard.chatLastMessageColor }}>
                    {chat.messages[0].content}
                  </p>
                )}
              </div>

              <div className="time-last-message-new-message">
                {chat.messages.length > 0 && (
                  <span
                    style={{
                      color: colors.dashboard.chatLastMessageTimeColor,
                      marginBottom: chat.totalMessagesUnread === 0 ? 'auto' : 0,
                    }}
                  >
                    {dayjs(chat.messages[0].createdAt).fromNow()}
                  </span>
                )}
                {chat.totalMessagesUnread > 0 && (
                  <div className="new-message">{chat.totalMessagesUnread}</div>
                )}
              </div>

              <i
                className="material-icons"
                style={{ color: colors.dashboard.chatArrowRightColor }}
              >
                keyboard_arrow_right
              </i>
            </ChatContainer>
          ))}
        </ChatList>
      )}

      {chats.length === 0 && (
        <>
          <BoldText
            style={{
              fontSize: 24,
              color: colors.dashboard.boldTextColor,
              position: 'absolute',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          >
            {strings.dashboard.noChatFound}
          </BoldText>

          <BoldText
            style={{
              fontSize: 20,
              color: colors.dashboard.boldTextColor,
              position: 'absolute',
              bottom: 90,
              left: 144,
            }}
          >
            {strings.dashboard.findUsersHere}
          </BoldText>
          <ArrowRight>
            <i
              className="material-icons"
              style={{ color: colors.dashboard.boldTextColor }}
            >
              subdirectory_arrow_right
            </i>
          </ArrowRight>
        </>
      )}

      <FloatingButton onClick={() => navigate('/add-user')}>
        <i className="material-icons">maps_ugc</i>
      </FloatingButton>

      {notificationPermission === 'default' && (
        <ToastyContainer
          content={
            <ToastyContent>
              <strong>
                Para receber notificações de novas mensagens autorize aqui
              </strong>
            </ToastyContent>
          }
          confirmButton={{
            label: 'Autorizar',
            onClick: () => askNotificationPermission(),
          }}
          cancelButton={{
            label: 'Não',
            onClick: () => {},
          }}
          toastOptions={{
            duration: 20000,
          }}
        />
      )}
    </Container>
  );
}
