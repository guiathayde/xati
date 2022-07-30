import React from 'react';

import { useTheme } from '../../../hooks/theme';

import {
  Container,
  Photo,
  NameAndLastMessageContainer,
  NameText,
  LastMessageText,
  TimeLastMessageAndNotificationContainer,
  TimeLastMessageText,
  NotificationView,
  NotificationText,
  ChevronRight,
  Divider,
} from './styles';

import ChevronRightIcon from '../../../assets/home/chat/ic_chevron_right.png';

interface ChatProps {
  onPress?: () => void;
}

export const Chat: React.FC<ChatProps> = ({ onPress }) => {
  const { colors } = useTheme();

  return (
    <>
      <Container onPress={onPress}>
        <Photo
          source={{ uri: 'https://source.unsplash.com/tNCH0sKSZbA/300x300' }}
        />

        <NameAndLastMessageContainer>
          <NameText color={colors.descriptionFont} numberOfLines={1}>
            Annette Black
          </NameText>

          <LastMessageText color={colors.descriptionFont} numberOfLines={1}>
            Hey, did you talk to her?
          </LastMessageText>
        </NameAndLastMessageContainer>

        <TimeLastMessageAndNotificationContainer>
          <TimeLastMessageText color={colors.descriptionFont} numberOfLines={1}>
            2min ago
          </TimeLastMessageText>

          <NotificationView>
            <NotificationText>2</NotificationText>
          </NotificationView>
        </TimeLastMessageAndNotificationContainer>

        <ChevronRight source={ChevronRightIcon} />
      </Container>

      <Divider />
    </>
  );
};
