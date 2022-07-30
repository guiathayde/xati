import React from 'react';
import { useNavigation } from '@react-navigation/native';

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

export const Home = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();

  return (
    <Container backgroundColor={colors.appBackground}>
      <Profile onPress={() => navigation.navigate('Profile')}>
        <ProfilePhoto
          source={{ uri: 'https://source.unsplash.com/XAo09LtQiAQ/300x300' }}
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
