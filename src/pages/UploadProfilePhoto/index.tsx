import React, { useCallback, useState } from 'react';
import Modal from 'react-native-modal';
import ImagePicker from 'react-native-image-crop-picker';
import { useNavigation } from '@react-navigation/native';

// import { useAuth } from '../../hooks/auth';
import apiFirebase from '../../database/apiFirebase';

import {
  Container,
  Header,
  ProfileText,
  AvatarInput,
  LoadingView,
  ProfilePicture,
  ChangeProfilePicture,
  ChangeProfilePictureImage,
  Button,
  ButtonText,
  ModalContainer,
  ModalBar,
  ModalButton,
  ModalText,
  ModalSeparator,
  styles,
} from './styles';
import { ActivityIndicator } from 'react-native';

const UploadProfilePhoto: React.FC = () => {
  const { navigate } = useNavigation();

  const [profilePicture, setProfilePicture] = useState<string>();
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

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

        setProfilePicture(imageURL);
      })
      .catch(error => {
        console.log('Erro ao capturar imagem: ', error);
      });
  }, []);

  const uploadProfilePhotoByGallery = useCallback(async () => {
    setModalVisible(false);
    ImagePicker.openPicker({
      width: 640,
      height: 640,
      cropping: true,
    })
      .then(async image => {
        const imageURL = await apiFirebase.uploadProfilePhoto(image.path);
        await apiFirebase.updateAvatarDatabase(imageURL);

        setProfilePicture(imageURL);
      })
      .catch(error => {
        console.log('Erro ao capturar imagem: ', error);
      });
  }, []);

  const navigateToRegisterSuccess = useCallback(() => {
    navigate('RegisterSuccess');
  }, [navigate]);

  return (
    <>
      <Container>
        <Header>
          <ProfileText>Foto de perfil</ProfileText>
        </Header>

        <AvatarInput>
          {loading && (
            <LoadingView>
              <ActivityIndicator size="large" color="#377DFF" />
            </LoadingView>
          )}

          {profilePicture ? (
            <ProfilePicture
              source={{ uri: profilePicture }}
              onLoadStart={() => setLoading(true)}
              onLoadEnd={() => setLoading(false)}
            />
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

        <Button onPress={navigateToRegisterSuccess}>
          <ButtonText>Salvar</ButtonText>
        </Button>

        <Modal
          isVisible={modalVisible}
          onBackdropPress={() => setModalVisible(false)}
          backdropOpacity={0}
          style={styles.modal}
        >
          <ModalContainer>
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

export default UploadProfilePhoto;
