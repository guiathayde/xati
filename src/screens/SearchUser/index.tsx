import React from 'react';
import { useNavigation } from '@react-navigation/native';

import { useTheme } from '../../hooks/theme';

import { Header } from '../../components/Header';
import { Input } from '../../components/Input';
import { CircularButton } from '../../components/CircularButton';

import { UserFound } from './UserFound';

import {
  Container,
  SearchContainer,
  UserNotFoundText,
  UserNotFoundImage,
} from './styles';

import SadEmojiIcon from '../../assets/searchuser/ic_sad_emoji.png';

export const SearchUser = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();

  return (
    <Container backgroundColor={colors.appBackground}>
      <Header title="Search User" translateXTitle={-45} />

      <SearchContainer>
        <Input containerStyle={{ width: '75%' }} />
        <CircularButton
          containerStyle={{ marginLeft: 'auto', marginRight: 'auto' }}
          hasElevation
          backgroundColor={colors.defaultButtonBackground}
          size={54}
          iconWidth={24}
          iconHeight={24}
          iconSource={require('../../assets/searchuser/ic_search.png')}
        />
      </SearchContainer>

      <UserFound />

      <UserNotFoundText color={colors.descriptionFont}>
        User not found
      </UserNotFoundText>
      <UserNotFoundImage source={SadEmojiIcon} />
    </Container>
  );
};
