import {
  KeyboardEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { useAuth } from '../../hooks/auth';
import { useSocket } from '../../hooks/socket';
import { useColorMode } from '../../hooks/colorMode';

import { api } from '../../services/api';

import { Container } from '../../components/Container';
import { BackButton } from '../../components/BackButton';
import { Input } from '../../components/Input';

import { Header, UserName, UserImage, MessageList, Message } from './styles';

import { User } from '../../interfaces/User';
import { Message as MessageProps } from '../../interfaces/Message';

import profileDefaultLight from '../../assets/shared/profileDefaultLight.svg';
import profileDefaultDark from '../../assets/shared/profileDefaultDark.svg';
import { ChatRoom } from '../../interfaces/ChatRoom';

export function Chat() {
  const { user } = useAuth();
  const { socket } = useSocket();
  const { userToChatId } = useParams();
  const navigate = useNavigate();
  const { mode, colors } = useColorMode();

  const [sentStartChat, setSentStartChat] = useState(false);
  const [chatRoomId, setChatRoomId] = useState<string>();
  const [userToChat, setUserToChat] = useState<User>();
  const [messages, setMessages] = useState<MessageProps[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [typingStatus, setTypingStatus] = useState('');

  const lastMessageRef = useRef<HTMLDivElement>(null);

  const userToChatProfileSrc = useMemo(() => {
    if (userToChat && userToChat.photoUrl) return userToChat.photoUrl;
    if (mode === 'light') return profileDefaultLight;
    return profileDefaultDark;
  }, [mode, userToChat]);

  const handleSendMessage = useCallback(() => {
    if (!user) {
      alert('You must be logged in to send messages.');
      navigate('/signin');
      return;
    }

    if (newMessage.trim().length === 0) {
      alert('You must type a message to send.');
      return;
    }

    socket.emit('message', {
      chatRoomId,
      senderId: user.id,
      content: newMessage.trim(),
    });

    setNewMessage('');
  }, [chatRoomId, navigate, newMessage, socket, user]);

  const handleOnKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (user && user.name && user.name.length > 0)
        socket.emit('typing', `${user.name} is typing`);

      if (e.key === 'Enter') handleSendMessage();
    },
    [handleSendMessage, socket, user],
  );

  useEffect(() => {
    api
      .get(`/users/${userToChatId}`)
      .then(response => {
        setUserToChat(response.data);
      })
      .catch(err => console.error(err));
  }, [userToChatId]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!sentStartChat && socket && user) {
        socket.emit(
          'startChat',
          { userToChatId, userLoggedId: user.id },
          (room: ChatRoom) => {
            setChatRoomId(room.id);
            setMessages(room.messages);
          },
        );

        setSentStartChat(true);
      }
    }, 1500);

    return () => clearTimeout(timeout);
  }, [sentStartChat, socket, user, userToChatId]);

  useEffect(() => {
    function handleNewMessage(newMessage: MessageProps) {
      setMessages(oldMessages => [...oldMessages, newMessage]);
    }

    socket.on('message', handleNewMessage);

    return () => {
      socket.off('message', handleNewMessage);
    };
  }, [socket]);

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    socket.on('typingResponse', data => setTypingStatus(data));
  }, [socket]);

  return (
    <Container>
      <Header>
        <BackButton />

        <UserName style={{ color: colors.addUser.titleColor }}>
          {userToChat?.name}
        </UserName>

        <UserImage src={userToChatProfileSrc} alt={userToChat?.name} />
      </Header>

      {messages.length > 0 && user && (
        <MessageList ref={lastMessageRef}>
          {messages.map(message => (
            <Message key={message.id} isOwn={message.sender.id === user.id}>
              {message.content.length > 0 ? message.content : '   '}
            </Message>
          ))}
        </MessageList>
      )}

      {typingStatus.length > 0 && <p>{typingStatus}</p>}

      <Input
        name="message"
        placeholder="Message"
        hasSendButton
        autoCapitalize="sentences"
        onKeyDown={e => handleOnKeyDown(e)}
        onChange={e => setNewMessage(e.target.value)}
        value={newMessage}
        onSend={handleSendMessage}
        containerStyle={{ width: '90%', position: 'absolute', bottom: 16 }}
      />
    </Container>
  );
}
