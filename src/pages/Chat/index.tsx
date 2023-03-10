import { KeyboardEvent, useCallback, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { useAuth } from '../../hooks/auth';
import { useColorMode } from '../../hooks/colorMode';

import { Container } from '../../components/Container';
import { BackButton } from '../../components/BackButton';
import { Input } from '../../components/Input';

import { Header, UserName, UserImage, MessageList, Message } from './styles';

import { User } from '../../interfaces/User';
import { Message as MessageProps } from '../../interfaces/Message';

import { userToChat as fakeUserToChat } from '../../fakedata/userToChat';
import { messages as fakeMessages } from '../../fakedata/messages';

export function Chat() {
  const { user } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  const { colors } = useColorMode();

  const [userToChat] = useState<User | undefined>(
    process.env.NODE_ENV === 'development' ? fakeUserToChat : undefined,
  );
  const [messages, setMessages] = useState<MessageProps[]>(
    process.env.NODE_ENV === 'development' ? fakeMessages : [],
  );
  const [newMessage, setNewMessage] = useState('');

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

    const message: MessageProps = {
      id: String(new Date().getTime()),
      text: newMessage.trim(),
      user,
    };

    setMessages(oldMessages => [...oldMessages, message]);
    setNewMessage('');
  }, [navigate, newMessage, user]);

  const handleOnKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') handleSendMessage();
    },
    [handleSendMessage],
  );

  useEffect(() => {
    if (!user) navigate('/signin');
    else if (!id) navigate(-1);

    // TODO - Fetch user from API
    // TODO - Fetch messages from API
  }, [user, id, navigate]);

  return (
    <Container>
      <Header>
        <BackButton />

        <UserName style={{ color: colors.addUser.titleColor }}>
          Annette Black
        </UserName>

        <UserImage src={userToChat?.avatar} alt={userToChat?.name} />
      </Header>

      {messages.length > 0 && (
        <MessageList>
          {messages.map(message => (
            <Message key={message.id} isOwn={message.user.name === user?.name}>
              {message.text.length > 0 ? message.text : '   '}
            </Message>
          ))}
        </MessageList>
      )}

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
