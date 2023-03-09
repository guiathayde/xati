import { useNavigate } from 'react-router-dom';

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

export function Dashboard() {
  const { colors } = useColorMode();
  const navigate = useNavigate();

  const chats = [
    {
      id: 1,
      name: 'Annette Black',
      lastMessage: 'Hey, did you talk to her?',
      lastMessageTime: '2min ago',
      messagesUnread: 2,
      profilePicture: 'https://source.unsplash.com/random/300x300/?face',
    },
    {
      id: 2,
      name: 'Cameron Williamson',
      lastMessage: 'Ok, Cya.  🤗',
      lastMessageTime: '35min ago',
      messagesUnread: 0,
      profilePicture: 'https://source.unsplash.com/random/300x300/?face',
    },
    {
      id: 3,
      name: 'Brennda Smily',
      lastMessage: 'Sent a picture',
      lastMessageTime: '1d ago',
      messagesUnread: 3,
      profilePicture: 'https://source.unsplash.com/random/300x300/?face',
    },
    {
      id: 4,
      name: 'Jane Cooper',
      lastMessage: 'Thanks, ill call you there.',
      lastMessageTime: '1d ago',
      messagesUnread: 0,
      profilePicture: 'https://source.unsplash.com/random/300x300/?face',
    },
    {
      id: 5,
      name: 'Jacob Jones',
      lastMessage:
        'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
      lastMessageTime: '2d ago',
      messagesUnread: 0,
      profilePicture: 'https://source.unsplash.com/random/300x300/?face',
    },
  ];

  return (
    <Container>
      <ProfileButton
        src="https://i.imgur.com/SMB38Jk.jpg"
        alt="Profile"
        onClick={() => navigate('/profile')}
      />

      <ChatList>
        {chats.map(chat => (
          <ChatContainer
            key={chat.id}
            to={'/chat'}
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
