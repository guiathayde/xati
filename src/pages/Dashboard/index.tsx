import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../../hooks/auth';
import { useColorMode } from '../../hooks/colorMode';

import { Container } from '../../components/Container';

import {
  ProfileButton,
  BoldText,
  ArrowRight,
  FloatingButton,
  ChatList,
  ChatContainer,
} from './styles';

import { Chat } from '../../interfaces/Chat';

import { chats as fakeChats } from '../../fakedata/chats';

export function Dashboard() {
  const { user } = useAuth();
  const { colors } = useColorMode();
  const navigate = useNavigate();

  const [chats] = useState<Chat[]>(
    process.env.NODE_ENV === 'development' ? fakeChats : [],
  );

  useEffect(() => {
    if (!user) navigate('/signin');
  }, [navigate, user]);

  return (
    <Container>
      <ProfileButton
        src={user?.avatar}
        alt={user?.avatar}
        onClick={() => navigate('/profile')}
      />

      <ChatList>
        {chats.map(chat => (
          <ChatContainer
            key={chat.id}
            to={'/chat/' + chat.id}
            style={{
              borderBottomColor:
                colors.dashboard.chatContainerBottomBorderColor,
            }}
          >
            <img src={chat.profilePicture} alt="Profile" />

            <div className="name-last-message">
              <span style={{ color: colors.dashboard.chatNameColor }}>
                {chat.name}
              </span>
              <p style={{ color: colors.dashboard.chatLastMessageColor }}>
                {chat.lastMessage}
              </p>
            </div>

            <div className="time-last-message-new-message">
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
