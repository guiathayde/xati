import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../../hooks/auth';
import { useSocket } from '../../hooks/socket';
import { useColorMode } from '../../hooks/colorMode';

import { api } from '../../services/api';

import { Container } from '../../components/Container';

import {
  ProfileButton,
  BoldText,
  ArrowRight,
  FloatingButton,
  ChatList,
  ChatContainer,
} from './styles';

import { User } from '../../interfaces/User';

import profileDefaultLight from '../../assets/shared/profileDefaultLight.svg';
import profileDefaultDark from '../../assets/shared/profileDefaultDark.svg';

interface Chat {
  id: string;
  users: User[];
}

export function Dashboard() {
  const { user } = useAuth();
  const { socket } = useSocket();
  const { mode, colors } = useColorMode();
  const navigate = useNavigate();

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
    function handleNewChat(newChat: Chat) {
      setChats(oldChats => [...oldChats, newChat]);
    }

    socket.on('newChat', handleNewChat);

    return () => {
      socket.off('newChat', handleNewChat);
    };
  }, [socket]);

  return (
    <Container>
      <ProfileButton
        src={profileSrc}
        alt={user?.name}
        onClick={() => navigate('/profile')}
      />

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
              <span style={{ color: colors.dashboard.chatNameColor }}>
                {chat.users[0].name}
              </span>
              <p style={{ color: colors.dashboard.chatLastMessageColor }}>
                {chat.users[0].name}
              </p>
            </div>

            {/* <div className="time-last-message-new-message">
              <span
                style={{
                  color: colors.dashboard.chatLastMessageTimeColor,
                  marginBottom: chat.messagesUnread === 0 ? 'auto' : 0,
                }}
              >
                {chat.lastMessageTime}
              </span>
              {chat.messagesUnread > 0 && (
                <div className="new-message">{chat.messagesUnread}</div>
              )}
            </div> */}

            <i
              className="material-icons"
              style={{ color: colors.dashboard.chatArrowRightColor }}
            >
              keyboard_arrow_right
            </i>
          </ChatContainer>
        ))}
      </ChatList>

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
            No chat found
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
            Find users here
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
    </Container>
  );
}
