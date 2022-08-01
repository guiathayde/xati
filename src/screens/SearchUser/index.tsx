import React, { useCallback, useState } from 'react';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
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
  const navigation = useNavigation();

  const [codeSearched, setCodeSearched] = useState('');
  const [userFound, setUserFound] = useState<User>();

  const onSearchButtonPress = useCallback(async () => {
    if (codeSearched.length > 3) {
      const querySnapshot = await firestore()
        .collection('users')
        .where('code', '==', codeSearched)
        .get();

      const userSearched = querySnapshot.docs.map(doc => {
        return {
          uid: doc.id,
          ...doc.data(),
        };
      })[0] as User;
      console.log('userSearched:', userSearched);

      if (userSearched.uid) {
        setUserFound(userSearched);
      } else {
        Alert.alert(
          'Usuário não encontrado',
          'Não foi possível encontrar o usuário com o código informado.',
        );
      }
    } else {
      Alert.alert('User code must be at least 5 characters long');
    }
  }, [codeSearched]);

  return (
    <Container backgroundColor={colors.appBackground}>
      <Header title="Search User" translateXTitle={-45} />

      <SearchContainer>
        <Input containerStyle={{ width: '75%' }} onChangeText={setCodeSearched} />
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

      {userFound && <UserFound user={userFound} />}

      <UserNotFoundText color={colors.descriptionFont}>
        User not found
      </UserNotFoundText>
      <UserNotFoundImage source={SadEmojiIcon} />
    </Container>
  );
};
