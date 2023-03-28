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
import { useTranslate } from '../../hooks/translate';

import { api } from '../../services/api';

import { Container } from '../../components/Container';
import { BackButton } from '../../components/BackButton';
import { Input } from '../../components/Input';
import { LoadingModal } from '../../components/LoadingModal';

import {
  Header,
  UserName,
  UserStatus,
  UserImage,
  MessageList,
  Message,
  Typing,
} from './styles';

import { User } from '../../interfaces/User';
import { Message as MessageProps } from '../../interfaces/Message';
import { ChatRoom } from '../../interfaces/ChatRoom';

import profileDefaultLight from '../../assets/shared/profileDefaultLight.svg';
import profileDefaultDark from '../../assets/shared/profileDefaultDark.svg';

export function Chat() {
  const { user } = useAuth();
  const { socket } = useSocket();
  const { userToChatId } = useParams();
  const navigate = useNavigate();
  const { mode, colors } = useColorMode();
  const { strings } = useTranslate();

  const [isLoading, setIsLoading] = useState(true);
  const [chatRoomId, setChatRoomId] = useState<string>();
  const [userToChat, setUserToChat] = useState<User>();
  const [messages, setMessages] = useState<MessageProps[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isOnline, setIsOnline] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const inputMessageRef = useRef<HTMLInputElement>(null);
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

  const handleOnChengeInputMessage = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;

      setNewMessage(value);
    },
    [],
  );

  const handleOnKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') handleSendMessage();
    },
    [handleSendMessage],
  );

  const renderMessages = useCallback(
    (message: MessageProps, index: number) => {
      const isOwn = user ? message.sender.id === user.id : false;

      const beforeMessageIndex = messages.indexOf(message) - 1;
      const nextMessageIndex = messages.indexOf(message) + 1;
      let beforeMessage: MessageProps | undefined = undefined;
      let nextMessage: MessageProps | undefined = undefined;
      if (beforeMessageIndex >= 0)
        beforeMessage = messages[messages.indexOf(message) - 1];
      if (nextMessageIndex < messages.length)
        nextMessage = messages[messages.indexOf(message) + 1];

      let reduceMarginTop = '';
      let reduceMarginBottom = '';
      if (beforeMessage && beforeMessage.sender.id === message.sender.id)
        reduceMarginTop = 'reduce-margin-top';
      if (nextMessage && nextMessage.sender.id === message.sender.id)
        reduceMarginBottom = 'reduce-margin-bottom';

      const reduceMargin = `${reduceMarginTop} ${reduceMarginBottom}`;

      return (
        <Message
          key={message.id}
          ref={index === messages.length - 1 ? lastMessageRef : null}
          className={reduceMargin}
          isOwn={isOwn}
        >
          {message.content.length > 0 ? message.content : '   '}
        </Message>
      );
    },
    [user, messages],
  );

  useEffect(() => {
    setIsLoading(true);

    const timeout = setTimeout(() => {
      if (socket && user && userToChatId) {
        socket.emit(
          'startChat',
          { userToChatId, userLoggedId: user.id },
          (room: ChatRoom) => {
            const userToChat = room.users.find(u => user.id !== u.id);

            if (userToChat) setIsOnline(userToChat.isOnline);

            setUserToChat(userToChat);
            setChatRoomId(room.id);
            setMessages(room.messages);
            setIsLoading(false);
          },
        );
      }

      setIsLoading(false);
    }, 1000);

    return () => clearInterval(timeout);
  }, [socket, user, userToChatId]);

  useEffect(() => {
    function handleUserToChatStatus(data: {
      userId: string;
      isOnline: boolean;
    }) {
      if (user && data.userId !== user.id) {
        setIsOnline(data.isOnline);
      }
    }
    function handleNewMessage(newMessage: MessageProps) {
      setMessages(oldMessages => [...oldMessages, newMessage]);

      if (user && newMessage.sender.id !== user.id)
        api.get(`/messages/read/${newMessage.id}`);
    }
    function handleTyping(data: { senderId: string; content: string }) {
      if (user && data.senderId !== user.id) {
        setIsTyping(data.content.length > 0);
      }
    }

    socket.on('userToChatStatus', handleUserToChatStatus);
    socket.on('message', handleNewMessage);
    socket.on('typing', handleTyping);

    return () => {
      socket.off('userToChatStatus', handleUserToChatStatus);
      socket.off('message', handleNewMessage);
      socket.off('typing', handleTyping);
    };
  }, [user, socket]);

  useEffect(() => {
    if (user && socket && chatRoomId) {
      socket.emit('typing', {
        chatRoomId,
        senderId: user.id,
        content: newMessage,
      });
    }
  }, [user, socket, chatRoomId, newMessage]);

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <Container>
      <Header>
        <BackButton />

        <div className="name-status">
          <UserName style={{ color: colors.addUser.titleColor }}>
            {userToChat?.name}
          </UserName>

          {!isTyping && (
            <UserStatus>
              {!isTyping && isOnline ? (
                <div className="online" />
              ) : (
                <div className="offline" />
              )}
              {!isTyping && isOnline ? 'online' : 'offline'}
            </UserStatus>
          )}

          {isTyping && <Typing>{strings.chat.typing}</Typing>}
        </div>

        <UserImage src={userToChatProfileSrc} alt={userToChat?.name} />
      </Header>

      {messages.length > 0 && user && (
        <MessageList>{messages.map(renderMessages)}</MessageList>
      )}

      <Input
        ref={inputMessageRef}
        name="message"
        placeholder={strings.chat.inputMessagePlaceholder}
        hasSendButton
        autoCapitalize="sentences"
        autoComplete="on"
        spellCheck
        onKeyDown={handleOnKeyDown}
        onChange={handleOnChengeInputMessage}
        value={newMessage}
        onSend={handleSendMessage}
        containerStyle={{
          width: '90%',
          marginTop: 'auto',
        }}
      />

      <LoadingModal isOpen={isLoading} setIsOpen={setIsLoading} />
    </Container>
  );
}
