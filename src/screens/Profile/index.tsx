import React, { useCallback, useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { useHeaderHeight } from '@react-navigation/elements';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import Clipboard from '@react-native-clipboard/clipboard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

import { useTheme } from '../../hooks/theme';

import { Header } from '../../components/Header';
import { CircularButton } from '../../components/CircularButton';
import { Input } from '../../components/Input';

import { RectangularButton } from './RectangularButton';
import { EditPhotoModal } from './EditPhotoModal';

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

  const [name, setName] = useState('');

  const [isEditPhotoModalVisible, setIsEditPhotoModalVisible] = useState(false);

  const updateName = useCallback(() => {
    if (name.length > 0) {
      auth()
        .currentUser?.updateProfile({
          displayName: name,
        })
        .then(async () => {
          await firestore().collection('users').doc(user?.uid).update({
            name,
          });

          Toast.show({
            type: 'info',
            text1: 'Nome atualizado com sucesso!',
            position: 'top',
            visibilityTime: 2000,
          });
        })
        .catch(error => {
          console.log(error);
          Toast.show({
            type: 'error',
            text1: 'Erro ao atualizar nome!',
            text2: 'Tente novamente mais tarde.',
            position: 'top',
            visibilityTime: 3000,
          });
        });
    }
  }, [name]);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(currentUser => {
      if (currentUser) {
        setUser({
          uid: currentUser.uid,
          name: currentUser.displayName ? currentUser.displayName : '',
          photoUrl: currentUser.photoURL ? currentUser.photoURL : '',
        });

        setName(currentUser.displayName ? currentUser.displayName : '');
      }
    });

    AsyncStorage.getItem('@Xati.:userCode')
      .then(code => {
        if (code) {
          setUserCode(code);
        }
      })
      .catch(error => console.log(error));

    return () => subscriber();
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
              onPress={() =>
                setIsEditPhotoModalVisible(!isEditPhotoModalVisible)
              }
            />
          </PhotoContainer>

          <Input
            containerStyle={{ width: '80%', marginTop: 32 }}
            value={name}
            onChangeText={setName}
          />

          <RectangularButton
            containerStyle={{ width: '80%', marginTop: 24 }}
            color="blue"
            text="Save"
            onPress={updateName}
          />

          <Input
            containerStyle={{ width: '80%', marginTop: 32 }}
            iconSource={ContentCopyIcon}
            iconCallback={() => {
              Clipboard.setString(userCode);
              Toast.show({
                type: 'info',
                text1: 'Código copiado para a área de transferência',
                position: 'bottom',
                visibilityTime: 1000,
              });
            }}
            value={userCode}
            editable={false}
          />

          <RectangularButton
            containerStyle={{ width: '80%', marginTop: 24, marginBottom: 64 }}
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

      <EditPhotoModal
        isEditPhotoModalVisible={isEditPhotoModalVisible}
        setIsEditPhotoModalVisible={setIsEditPhotoModalVisible}
      />
    </Container>
  );
};
