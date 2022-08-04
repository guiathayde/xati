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
  userFound: User;
}

export const UserFound: React.FC<UserFoundProps> = ({ userFound }) => {
  const { colors } = useTheme();
  const { setUserSelected, setChatId } = useChat();
  const navigation = useNavigation();

  const handleOnPress = useCallback(() => {
    setChatId(undefined);
    setUserSelected(userFound);
    navigation.navigate('Chat');
  }, [userFound]);

  return (
    <>
      <Container onPress={handleOnPress}>
        <Photo source={{ uri: userFound.photoUrl }} />

        <NameText
          style={{
            transform: [{ translateX: -1 * (userFound.name.length * 4) }],
          }}
          color={colors.descriptionFont}
          numberOfLines={1}
        >
          {userFound.name}
        </NameText>

        <ChevronRight source={ChevronRightIcon} />
      </Container>

      <Divider />
    </>
  );
};
