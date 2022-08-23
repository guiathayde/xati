import React, { useEffect, useState } from 'react';
import auth from '@react-native-firebase/auth';
import { IMessage } from 'react-native-gifted-chat';
import MarqueeText from 'react-native-marquee';
import moment from 'moment';
import 'moment/locale/pt-br';

import { useTheme } from '../../../hooks/theme';

import {
  Container,
  Photo,
  NameAndLastMessageContainer,
  NameText,
  LastMessageText,
  TimeLastMessageAndNotificationContainer,
  NotificationView,
  NotificationText,
  ChevronRight,
  Divider,
  styles,
} from './styles';

import ChevronRightIcon from '../../../assets/home/chat/ic_chevron_right.png';
import { useChat } from '../../../hooks/chat';

type User = {
  uid: string;
  name: string;
  photoUrl: string;
};

type ChatData = {
  id: string;
  users: User[];
  lastMessage: IMessage;
  [key: string]: any;
};

interface ChatProps {
  chatData: ChatData;
  onPress?: () => void;
}

export const Chat: React.FC<ChatProps> = ({ chatData, onPress }) => {
  moment.locale('pt-br');
  moment.updateLocale('pt-br', {
    relativeTime: {
      ss: 'há %d segundos',
    },
  });

  const { colors } = useTheme();
  const { setChatId, setUserSelected } = useChat();

  const [currentUser, setCurrentUser] = useState<User>();
  const [selectedUser, setSelectedUser] = useState<User>();

  const [notification, setNotification] = useState(0);

  const [updateLastMessageTime, setUpdateLastMessageTime] = useState(
    Date.now(),
  );

  useEffect(() => {
    const currentUserFirebase = auth().currentUser;
    if (currentUserFirebase) {
      const currentUserUpdated: User = {
        uid: currentUserFirebase.uid,
        name: currentUserFirebase.displayName
          ? currentUserFirebase.displayName
          : '',
        photoUrl: currentUserFirebase.photoURL
          ? currentUserFirebase.photoURL
          : '',
      };

      setCurrentUser(currentUserUpdated);
    }
  }, []);

  useEffect(() => {
    const otherUserUpdated: User = chatData.users.find(
      user => user.uid !== currentUser?.uid,
    ) as User;
    setSelectedUser(otherUserUpdated);
  }, [currentUser]);

  useEffect(() => {
    if (currentUser && selectedUser) {
      for (const key in chatData) {
        if (key === currentUser.uid) {
          setNotification(Number(chatData[key]));
        }
      }
    }
  }, [currentUser, selectedUser, chatData]);

  useEffect(() => {
    setTimeout(() => setUpdateLastMessageTime(Date.now()), 60000);
  }, [updateLastMessageTime]);

  return (
    <>
      <Container
        onPress={() => {
          setChatId(chatData.chatId);
          setUserSelected(selectedUser);
          if (onPress) onPress();
        }}
      >
        <Photo
          source={{
            uri: selectedUser?.photoUrl,
          }}
        />

        <NameAndLastMessageContainer>
          <NameText color={colors.descriptionFont} numberOfLines={1}>
            {selectedUser?.name}
          </NameText>

          <LastMessageText color={colors.descriptionFont} numberOfLines={1}>
            {chatData.lastMessage.text}
          </LastMessageText>
        </NameAndLastMessageContainer>

        <TimeLastMessageAndNotificationContainer>
          <MarqueeText
            style={{
              ...styles.timeLastMessageText,
              color: colors.descriptionFont,
            }}
            speed={0.001}
            loop={true}
            delay={3000}
          >
            {moment(chatData.lastMessage.createdAt).fromNow()}
          </MarqueeText>

          {notification > 0 && (
            <NotificationView>
              <NotificationText>{notification}</NotificationText>
            </NotificationView>
          )}
        </TimeLastMessageAndNotificationContainer>

        <ChevronRight source={ChevronRightIcon} />
      </Container>

      <Divider />
    </>
  );
};
