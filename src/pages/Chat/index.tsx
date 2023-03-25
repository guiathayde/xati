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
import { LoadingModal } from '../../components/LoadingModal';

import { Header, UserName, UserImage, MessageList, Message } from './styles';

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

  const [isLoading, setIsLoading] = useState(true);
  const [inputMessageHeight, setInputMessageHeight] = useState(0);
  const [chatRoomId, setChatRoomId] = useState<string>();
  const [userToChat, setUserToChat] = useState<User>();
  const [messages, setMessages] = useState<MessageProps[]>([]);
  const [newMessage, setNewMessage] = useState('');

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

  const handleOnKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (user && user.name && user.name.length > 0)
        socket.emit('typing', `${user.name} is typing`);

      if (e.key === 'Enter') handleSendMessage();
    },
    [handleSendMessage, socket, user],
  );

  useEffect(() => {
    if (inputMessageRef.current) {
      setInputMessageHeight(inputMessageRef.current.offsetHeight);
    }
  }, [inputMessageRef]);

  useEffect(() => {
    setIsLoading(true);

    api
      .get(`/users/${userToChatId}`)
      .then(response => {
        setUserToChat(response.data);
        setIsLoading(false);
      })
      .catch(err => {
        console.error(err);
        setIsLoading(false);
      });
  }, [userToChatId]);

  useEffect(() => {
    setIsLoading(true);

    const timeout = setTimeout(() => {
      if (socket && user) {
        socket.emit(
          'startChat',
          { userToChatId, userLoggedId: user.id },
          (room: ChatRoom) => {
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
    function handleNewMessage(newMessage: MessageProps) {
      setMessages(oldMessages => [...oldMessages, newMessage]);

      if (user && newMessage.sender.id !== user.id)
        api.get(`/messages/read/${newMessage.id}`);
    }

    socket.on('message', handleNewMessage);

    return () => {
      socket.off('message', handleNewMessage);
    };
  }, [user, socket]);

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

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
        <MessageList style={{ marginBottom: inputMessageHeight + 28 }}>
          {messages.map((message, index) => {
            const isOwn = message.sender.id === user.id;

            const beforeMessageIndex = messages.indexOf(message) - 1;
            const nextMessageIndex = messages.indexOf(message) + 1;
            let beforeMessage: MessageProps | undefined = undefined;
            let nextMessage: MessageProps | undefined = undefined;
            if (beforeMessageIndex >= 0)
              beforeMessage = messages[messages.indexOf(message) - 1];
            if (nextMessageIndex < messages.length)
              nextMessage = messages[messages.indexOf(message) + 1];

            let reduceMargin = '';
            if (beforeMessage && beforeMessage.sender.id === message.sender.id)
              reduceMargin = 'reduce-margin';
            if (nextMessage && nextMessage.sender.id === message.sender.id)
              reduceMargin = 'reduce-margin';

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
          })}
        </MessageList>
      )}

      <Input
        ref={inputMessageRef}
        name="message"
        placeholder="Message"
        hasSendButton
        autoCapitalize="sentences"
        autoComplete="on"
        spellCheck
        onKeyDown={e => handleOnKeyDown(e)}
        onChange={e => setNewMessage(e.target.value)}
        value={newMessage}
        onSend={handleSendMessage}
        containerStyle={{ width: '90%', position: 'absolute', bottom: 16 }}
      />

      <LoadingModal isOpen={isLoading} setIsOpen={setIsLoading} />
    </Container>
  );
}
