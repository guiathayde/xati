import React, { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';

import { useTheme } from '../../../hooks/theme';
import { useChat } from '../../../hooks/chat';

import { Container, Photo, NameText, ChevronRight, Divider } from './styles';

import ChevronRightIcon from '../../../assets/home/chat/ic_chevron_right.png';

type User = {
  uid: string;
  name: string;
  photoUrl: string;
};

interface UserFoundProps {
  user: User;
}

export const UserFound: React.FC<UserFoundProps> = ({ user }) => {
  const { colors } = useTheme();
  const { setUserSelected } = useChat();
  const navigation = useNavigation();

  const handleOnPress = useCallback(() => {
    setUserSelected(user);
    navigation.navigate('Chat');
  }, [user]);

  return (
    <>
      <Container onPress={handleOnPress}>
        <Photo source={{ uri: user.photoUrl }} />

        <NameText
          style={{ transform: [{ translateX: -1 * (user.name.length * 4) }] }}
          color={colors.descriptionFont}
          numberOfLines={1}
        >
          {user.name}
        </NameText>

        <ChevronRight source={ChevronRightIcon} />
      </Container>

      <Divider />
    </>
  );
};
