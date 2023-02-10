import React, { useCallback, useState } from 'react';
import { Alert, Keyboard } from 'react-native';
import firestore from '@react-native-firebase/firestore';

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

type User = {
  uid: string;
  name: string;
  photoUrl: string;
};

export const SearchUser = () => {
  const { colors } = useTheme();

  const [codeSearched, setCodeSearched] = useState('');
  const [userFound, setUserFound] = useState<User>();
  const [wasUserFound, setWasUserFound] = useState<boolean>();

  const onSearchButtonPress = useCallback(async () => {
    Keyboard.dismiss();

    if (codeSearched.length > 3) {
      const querySnapshot = await firestore()
        .collection('users')
        .where('code', '==', codeSearched)
        .get();

      if (querySnapshot.empty) {
        setWasUserFound(false);
      } else {
        const userSearched = querySnapshot.docs.map(doc => {
          return {
            uid: doc.id,
            ...doc.data(),
          };
        })[0] as User;

        if (userSearched.uid) {
          setWasUserFound(true);
          setUserFound(userSearched);
        }
      }
    } else {
      Alert.alert('User code must be at least 5 characters long');
    }
  }, [codeSearched]);

  return (
    <Container backgroundColor={colors.appBackground}>
      <Header title="Search User" />

      <SearchContainer>
        <Input
          containerStyle={{ width: '75%' }}
          onChangeText={setCodeSearched}
        />
        <CircularButton
          containerStyle={{ marginLeft: 'auto', marginRight: 'auto' }}
          hasElevation
          backgroundColor={colors.defaultButtonBackground}
          size={54}
          iconWidth={24}
          iconHeight={24}
          iconSource={require('../../assets/searchuser/ic_search.png')}
          onPress={async () => await onSearchButtonPress()}
        />
      </SearchContainer>

      {userFound && <UserFound userFound={userFound} />}

      {typeof wasUserFound !== 'undefined' && !wasUserFound && (
        <>
          <UserNotFoundText color={colors.descriptionFont}>
            User not found
          </UserNotFoundText>
          <UserNotFoundImage source={SadEmojiIcon} />
        </>
      )}
    </Container>
  );
};
