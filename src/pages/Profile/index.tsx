import React, { useCallback, useRef, useState } from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Alert, Keyboard, TextInput } from 'react-native';
import { Form } from '@unform/mobile';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import Modal from 'react-native-modal';
import ImagePicker from 'react-native-image-crop-picker';
import { useNavigation } from '@react-navigation/native';
import apiFirebase from '../../database/apiFirebase';

import { useAuth } from '../../hooks/auth';

import Input from '../../components/Input';

import {
  Container,
  Header,
  AvatarInput,
  BackButton,
  BackIcon,
  BackButtonText,
  ProfileText,
  ProfilePicture,
  ChangeProfilePicture,
  ChangeProfilePictureImage,
  FormContent,
  Button,
  ButtonText,
  ButtonLogout,
  ModalContainer,
  ModalBar,
  ModalButton,
  ModalText,
  ModalSeparator,
  styles,
} from './styles';

import backIcon from '../../assets/back-icon.png';

interface ProfileFormData {
  name: string;
}

const Profile: React.FC = () => {
  const { goBack } = useNavigation();
  const { user, signOut, updateNameUser, updateAvatarUser } = useAuth();

  const [profilePicture, setProfilePicture] = useState(user.avatar);
  const [modalVisible, setModalVisible] = useState(false);

  const formRef = useRef<FormHandles>(null);
  const nameInputRef = useRef<TextInput>(null);

  const handleSignIn = useCallback(
    async (data: ProfileFormData) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          name: Yup.string().required('Necessário um nome novo'),
        });
        await schema.validate(data, {
          abortEarly: false,
        });

        updateNameUser(data.name);
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          console.log(err);
          return;
        }

        Alert.alert(
          'Erro ao atualizar perfil',
          'Necessário um nome novo se for trocar.',
        );
      }
    },
    [updateNameUser],
  );

  const uploadProfilePhotoByCamera = useCallback(async () => {
    setModalVisible(false);
    ImagePicker.openCamera({
      width: 640,
      height: 640,
      cropping: true,
    })
      .then(async image => {
        const imageURL = await apiFirebase.uploadProfilePhoto(image.path);
        await apiFirebase.updateAvatarDatabase(imageURL);

        updateAvatarUser(imageURL);

        setProfilePicture(imageURL);
      })
      .catch(error => {
        console.log('Erro ao capturar imagem: ', error);
      });
  }, [updateAvatarUser]);

  const uploadProfilePhotoByGallery = useCallback(async () => {
    setModalVisible(false);
    ImagePicker.openPicker({
      width: 640,
      height: 640,
      cropping: true,
    })
      .then(async image => {
        console.log(image);

        const imageURL = await apiFirebase.uploadProfilePhoto(image.path);
        await apiFirebase.updateAvatarDatabase(imageURL);

        updateAvatarUser(imageURL);

        setProfilePicture(imageURL);
      })
      .catch(error => {
        console.log('Erro ao capturar imagem: ', error);
      });
  }, [updateAvatarUser]);

  const navigateToHome = useCallback(() => {
    goBack();
  }, [goBack]);

  const logout = useCallback(() => {
    signOut();
  }, [signOut]);

  return (
    <>
      <Container>
        <Header>
          <BackButton onPress={navigateToHome}>
            <BackIcon source={backIcon} />
            <BackButtonText>Voltar</BackButtonText>
          </BackButton>

          <ProfileText>Perfil</ProfileText>
        </Header>

        <AvatarInput>
          {profilePicture ? (
            <ProfilePicture source={{ uri: profilePicture }} />
          ) : (
            <ProfilePicture source={require('../../assets/user-default.png')} />
          )}

          <ChangeProfilePicture
            onPress={() => {
              setModalVisible(!modalVisible);
            }}
          >
            <ChangeProfilePictureImage
              source={require('../../assets/change-icon.png')}
            />
          </ChangeProfilePicture>
        </AvatarInput>

        <FormContent>
          <Form
            ref={formRef}
            initialData={{ name: user.name }}
            onSubmit={handleSignIn}
            style={{ width: '100%' }}
          >
            <Input
              ref={nameInputRef}
              autoCorrect={false}
              autoCapitalize="words"
              name="name"
              placeholder="Seu nome"
              returnKeyType="send"
              onSubmitEditing={() => {
                Keyboard.dismiss();
                formRef.current?.submitForm();
              }}
            />

            <Button
              onPress={() => {
                Keyboard.dismiss();
                formRef.current?.submitForm();
              }}
            >
              <ButtonText>Salvar</ButtonText>
            </Button>

            <ButtonLogout onPress={logout}>
              <ButtonText>Sair</ButtonText>
            </ButtonLogout>
          </Form>
        </FormContent>

        <Modal
          isVisible={modalVisible}
          onBackdropPress={() => setModalVisible(false)}
          backdropOpacity={0}
          style={styles.modal}
        >
          <ModalContainer style={styles.shadow}>
            <ModalBar
              onTouchStart={() => {
                setModalVisible(false);
              }}
            />

            <ModalButton onPress={uploadProfilePhotoByCamera}>
              <ModalText>Usar câmera</ModalText>
            </ModalButton>

            <ModalSeparator />

            <ModalButton onPress={uploadProfilePhotoByGallery}>
              <ModalText>Escolher da galeria</ModalText>
            </ModalButton>
          </ModalContainer>
        </Modal>
      </Container>
    </>
  );
};

export default Profile;
