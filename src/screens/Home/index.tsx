import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';

import { useTheme } from '../../hooks/theme';

import { Chat } from './Chat';

import {
  Container,
  Profile,
  ProfilePhoto,
  NoChatFound,
  SearchUserButton,
  SearchUserIcon,
  FindUsersHereContainer,
  FindUsersHereText,
  FindUsersHereArrow,
} from './styles';

import FloatingButtonIcon from '../../assets/home/ic_floating_button.png';
import ArrowRightIcon from '../../assets/home/ic_right_arrow.png';

type User = {
  uid: string;
  name: string;
  avatarUrl: string;
};

export const Home = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();

  const [user, setUser] = useState<User>();

  useEffect(() => {
    const userData = auth().currentUser;

    if (userData) {
      setUser({
        uid: userData.uid,
        name: userData.displayName ? userData.displayName : '',
        avatarUrl: userData.photoURL ? userData.photoURL : '',
      });
    }
  }, []);

  return (
    <Container backgroundColor={colors.appBackground}>
      <Profile onPress={() => navigation.navigate('Profile')}>
        <ProfilePhoto
          source={{ uri: user?.avatarUrl }}
        />
      </Profile>

      <Chat onPress={() => navigation.navigate('Chat')} />

      <NoChatFound color={colors.descriptionFont}>No chat found</NoChatFound>

      <FindUsersHereContainer>
        <FindUsersHereText color={colors.descriptionFont}>
          find users here
        </FindUsersHereText>
        <FindUsersHereArrow source={ArrowRightIcon} />
      </FindUsersHereContainer>

      <SearchUserButton onPress={() => navigation.navigate('SearchUser')}>
        <SearchUserIcon source={FloatingButtonIcon} />
      </SearchUserButton>
    </Container>
  );
};
