import React, { useCallback, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import { checkAndRequestPermissions } from '../../utils/checkAndRequestPermissions';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { openCropper } from 'react-native-image-crop-picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  ScrollView,
  Image,
  Text,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Platform,
  Modal,
  TouchableWithoutFeedback,
  Alert,
  ActivityIndicator,
} from 'react-native';

import { useAuth } from '../../hooks/auth';

import { Back } from '../../components/Back';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';

import { styles } from './styles';

import DefaultAvatar from '../../assets/screens/Profile/default_user.png';
import EditIcon from '../../assets/screens/Profile/ic_edit.png';

export function Profile() {
  const naigavetion = useNavigation();
  const { user } = useAuth();

  const [newProfilePhoto, setNewProfilePhoto] = useState<string>();
  const [newUsername, setNewUsername] = useState<string>();
  const [isSelectPhotoModalOpen, setIsSelectPhotoModalOpen] = useState(false);
  const [isLoadingProfileImage, setIsLoadingProfileImage] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleBack = useCallback(() => {
    naigavetion.goBack();
  }, [naigavetion]);

  const handleEditPhoto = useCallback(() => {
    setIsSelectPhotoModalOpen(true);
  }, []);

  const handleSelectPhotoFromCamera = useCallback(async () => {
    await checkAndRequestPermissions();

    const { assets } = await launchCamera({
      mediaType: 'photo',
      saveToPhotos: true,
      cameraType: 'front',
    });

    if (assets && assets[0].uri) {
      const imageCropped = await openCropper({
        mediaType: 'photo',
        path: assets[0].uri,
        width: 300,
        height: 300,
      });

      setNewProfilePhoto(imageCropped.path);
    }

    setIsSelectPhotoModalOpen(false);
  }, []);

  const handleSelectPhotoFromGallery = useCallback(async () => {
    await checkAndRequestPermissions();

    const { assets } = await launchImageLibrary({
      mediaType: 'photo',
      selectionLimit: 1,
    });

    if (assets && assets[0].uri) {
      const imageCropped = await openCropper({
        mediaType: 'photo',
        path: assets[0].uri,
        width: 300,
        height: 300,
      });

      setNewProfilePhoto(imageCropped.path);
    }

    setIsSelectPhotoModalOpen(false);
  }, []);

  const uploadAndUpdatePhotoURL = useCallback(async (imagePath: string) => {
    const currentUser = auth().currentUser;
    if (currentUser) {
      const storageRef = storage().ref(
        `users/${currentUser.uid}/profile_photo.png`,
      );
      const task = storageRef.putFile(imagePath);

      task.on('state_changed', taskSnapshot => {
        console.log(
          `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
        );
      });

      task.then(async () => {
        const photoURL = await storageRef.getDownloadURL();

        await currentUser
          .updateProfile({
            photoURL,
          })
          .then(() => {
            console.log('User photo updated!');
          })
          .catch(error => {
            console.error(error);
          });
      });
    } else {
      Alert.alert('Error', 'You are not logged in!');
    }
  }, []);

  const handleSave = useCallback(async () => {
    setIsLoading(true);

    if (newProfilePhoto || newUsername) {
      const currentUser = auth().currentUser;

      if (currentUser) {
        if (newProfilePhoto) {
          await uploadAndUpdatePhotoURL(newProfilePhoto);
        }

        if (newUsername) {
          await currentUser
            .updateProfile({
              displayName: newUsername,
            })
            .then(() => {
              console.log('User name updated!');
            })
            .catch(error => {
              console.error(error);
            });
        }
      } else {
        Alert.alert('Error', 'You are not logged in!');
      }
    }

    setIsLoading(false);
  }, [newProfilePhoto, newUsername, uploadAndUpdatePhotoURL]);

  const photoSource = newProfilePhoto
    ? { uri: newProfilePhoto }
    : user && user.photoURL
    ? { uri: user.photoURL }
    : DefaultAvatar;
  const username = newUsername
    ? newUsername
    : user?.displayName
    ? user.displayName
    : '';

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.header}>
            <Back
              containerStyle={{
                top: -10,
              }}
              onPress={handleBack}
            />

            <Text style={styles.title}>Profile</Text>
          </View>

          <View style={styles.photoContainer}>
            <TouchableOpacity style={styles.photoImage} activeOpacity={0.8}>
              {isLoadingProfileImage && (
                <ActivityIndicator size="large" color="#377DFF" />
              )}
              <Image
                style={styles.photoImage}
                source={photoSource}
                onLoadStart={() => setIsLoadingProfileImage(true)}
                onLoadEnd={() => setIsLoadingProfileImage(false)}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.photoEditButton}
              onPress={() => handleEditPhoto()}
            >
              <Image style={styles.photoEditIcon} source={EditIcon} />
            </TouchableOpacity>
          </View>

          <Input
            containerStyle={{
              width: '85%',
              marginTop: 40,
            }}
            inputStyle={{
              letterSpacing: 0,
            }}
            placeholder="Username"
            value={newUsername ?? username}
            onChangeText={setNewUsername}
          />

          <Button
            containerStyle={{
              width: '85%',
              marginTop: 24,
              marginBottom: 64,
            }}
            title="Save"
            onPress={async () => await handleSave()}
            isLoading={isLoading}
          />

          <Button
            containerStyle={{
              width: '85%',
              marginTop: 'auto',
              marginBottom: 16,
              backgroundColor: '#FF3737',
            }}
            title="Logout"
            onPress={() => {
              auth()
                .signOut()
                .then(() => console.log('User signed out!'));
            }}
          />

          <Modal
            animationType="slide"
            visible={isSelectPhotoModalOpen}
            transparent
            onRequestClose={() => {
              setIsSelectPhotoModalOpen(false);
            }}
          >
            <TouchableWithoutFeedback
              onPress={() => {
                setIsSelectPhotoModalOpen(false);
              }}
            >
              <View style={{ flex: 1, backgroundColor: 'transparent' }}>
                <View style={styles.selectPhotoModalContainer}>
                  <TouchableOpacity
                    style={styles.selectPhotoModalHandler}
                    onPress={() => {
                      setIsSelectPhotoModalOpen(false);
                    }}
                  />

                  <TouchableOpacity
                    style={styles.selectPhotoModalButton}
                    onPress={async () => {
                      await handleSelectPhotoFromCamera();
                    }}
                  >
                    <Text style={styles.selectPhotoModalButtonText}>
                      Use camera
                    </Text>
                  </TouchableOpacity>

                  <View style={styles.selectPhotoModalDivider} />

                  <TouchableOpacity
                    style={styles.selectPhotoModalButton}
                    onPress={async () => {
                      await handleSelectPhotoFromGallery();
                    }}
                  >
                    <Text style={styles.selectPhotoModalButtonText}>
                      Choose from gallery
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </Modal>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
