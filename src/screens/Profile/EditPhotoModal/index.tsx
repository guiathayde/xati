import React, { useState, useCallback, useEffect } from 'react';
import { TouchableOpacity, useWindowDimensions } from 'react-native';
import ImagePicker, { ImageOrVideo } from 'react-native-image-crop-picker';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import Modal from 'react-native-modal';

import { useTheme } from '../../../hooks/theme';

import {
  Container,
  HandleModal,
  SelectTypePhotoText,
  Divider,
  styles,
} from './styles';

type User = {
  uid: string;
  name: string;
  photoUrl: string;
};

interface EditPhotoModalProps {
  isEditPhotoModalVisible: boolean;
  setIsEditPhotoModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const EditPhotoModal: React.FC<EditPhotoModalProps> = ({
  isEditPhotoModalVisible,
  setIsEditPhotoModalVisible,
}) => {
  const { colors } = useTheme();
  const { height } = useWindowDimensions();

  const [user, setUser] = useState<User>();

  const uploadPhoto = useCallback(
    async (selectedPhoto: ImageOrVideo) => {
      if (selectedPhoto) {
        let fileType = '.jpg';
        if (selectedPhoto.path) {
          const type = selectedPhoto.path.match(/\.(?:.(?!\.))+$/);
          if (type) fileType = type[0];
        }
        const fileName = `${user?.uid}${fileType}`;

        const photoRef = storage().ref(`profilePhotos/${fileName}`);
        if (selectedPhoto.path) {
          const uploadTask = photoRef.putFile(selectedPhoto.path);

          uploadTask.then(() => {
            photoRef.getDownloadURL().then(async url => {
              await auth().currentUser?.updateProfile({
                photoURL: url,
              });

              await firestore().collection('users').doc(user?.uid).update({
                photoUrl: url,
              });
            });
          });
        }
      }
    },
    [user],
  );

  async function handleUseCamera() {
    const result = await ImagePicker.openCamera({
      width: 500,
      height: 500,
      cropping: true,
      mediaType: 'photo',
    });

    if (result.path) {
      await uploadPhoto(result);
    }
  }

  async function handleChooseFromGallery() {
    const result = await ImagePicker.openPicker({
      width: 500,
      height: 500,
      cropping: true,
      mediaType: 'photo',
    });

    if (result.path) {
      await uploadPhoto(result);
    }
  }

  useEffect(() => {
    const currentUser = auth().currentUser;
    if (currentUser) {
      setUser({
        uid: currentUser.uid,
        name: currentUser.displayName ? currentUser.displayName : '',
        photoUrl: currentUser.photoURL ? currentUser.photoURL : '',
      });
    }
  }, []);

  return (
    <Modal
      isVisible={isEditPhotoModalVisible}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      onBackButtonPress={() => setIsEditPhotoModalVisible(false)}
      onBackdropPress={() => setIsEditPhotoModalVisible(false)}
      onSwipeComplete={() => setIsEditPhotoModalVisible(false)}
      swipeDirection="down"
      style={{
        ...styles.modalContainer,
        marginTop: height * 0.7,
        height: height * 0.3,
        backgroundColor: colors.editPhotoModalBackground,
      }}
    >
      <Container backgroundColor={colors.editPhotoModalBackground}>
        <HandleModal />

        <TouchableOpacity
          style={{ marginTop: 16 }}
          onPress={async () => await handleUseCamera()}
        >
          <SelectTypePhotoText>Use camera</SelectTypePhotoText>
        </TouchableOpacity>

        <Divider />

        <TouchableOpacity onPress={async () => await handleChooseFromGallery()}>
          <SelectTypePhotoText>Choose from gallery</SelectTypePhotoText>
        </TouchableOpacity>
      </Container>
    </Modal>
  );
};
