import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { useHeaderHeight } from '@react-navigation/elements';
import auth from '@react-native-firebase/auth';
import Clipboard from '@react-native-clipboard/clipboard';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useTheme } from '../../hooks/theme';

import { Header } from '../../components/Header';
import { CircularButton } from '../../components/CircularButton';
import { Input } from '../../components/Input';
import { RectangularButton } from './RectangularButton';

import {
  Container,
  ContentContainer,
  PhotoContainer,
  PhotoImage,
  styles,
} from './styles';

import ContentCopyIcon from '../../assets/profile/ic_content_copy.png';

type User = {
  uid: string;
  name: string;
  photoUrl: string;
};

export const Profile = () => {
  const { colors } = useTheme();
  const headerHeight = useHeaderHeight();

  const [user, setUser] = useState<User>();
  const [userCode, setUserCode] = useState('');

  useEffect(() => {
    const userData = auth().currentUser;

    if (userData) {
      setUser({
        uid: userData.uid,
        name: userData.displayName ? userData.displayName : '',
        photoUrl: userData.photoURL ? userData.photoURL : '',
      });
    }

    AsyncStorage.getItem('@Xati.:userCode')
      .then(code => {
        if (code) {
          setUserCode(code);
        }
      })
      .catch(error => console.log(error));
  }, []);

  return (
    <Container backgroundColor={colors.appBackground}>
      <Header title="Profile" />

      <KeyboardAvoidingView
        keyboardVerticalOffset={headerHeight}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1, width: '100%' }}
      >
        <ContentContainer
          contentContainerStyle={{ alignItems: 'center' }}
          showsVerticalScrollIndicator={false}
        >
          <PhotoContainer>
            <PhotoImage
              source={{
                uri: user?.photoUrl,
              }}
            />
            <CircularButton
              containerStyle={styles.edit}
              backgroundColor={colors.defaultButtonBackground}
              size={50}
              iconWidth={24}
              iconHeight={24}
              iconSource={require('../../assets/profile/ic_edit.png')}
            />
          </PhotoContainer>

          <Input
            containerStyle={{ width: '80%', marginTop: 32 }}
            value={user?.name}
          />

          <RectangularButton
            containerStyle={{ width: '80%', marginTop: 24 }}
            color="blue"
            text="Save"
          />

          <Input
            containerStyle={{ width: '80%', marginTop: 32 }}
            iconSource={ContentCopyIcon}
            iconCallback={() => Clipboard.setString(userCode)}
            value={userCode}
            editable={false}
          />

          <RectangularButton
            containerStyle={{ width: '80%', marginTop: 24 }}
            color="red"
            text="Logout"
            onPress={() =>
              auth()
                .signOut()
                .catch(error => console.log('Error trying to logout', error))
            }
          />
        </ContentContainer>
      </KeyboardAvoidingView>
    </Container>
  );
};
