import { ChangeEvent, useCallback, useMemo, useState } from 'react';

import { useAuth } from '../../hooks/auth';
import { useColorMode } from '../../hooks/colorMode';

import { Container } from '../../components/Container';
import { BackButton } from '../../components/BackButton';
import { Input } from '../../components/Input';
import { PhoneNumberInput } from '../../components/PhoneNumberInput';
import { RectangleButton } from '../../components/RectangleButton';
import { ImageCropModal } from '../../components/ImageCropModal';
import { SelectPhotoModal } from './components/SelectPhotoModal';
import { LoadingModal } from '../../components/LoadingModal';

import { Title, PhotoContainer, Photo, PhotoEditContainer } from './styles';

import EditIcon from '../../assets/pages/profile/edit.svg';

import profileDefaultLight from '../../assets/shared/profileDefaultLight.svg';
import profileDefaultDark from '../../assets/shared/profileDefaultDark.svg';

export function Profile() {
  const { user, updateProfileName, updateProfilePhoto, signOut } = useAuth();
  const { mode, colors } = useColorMode();

  const [photoUrl, setPhotoUrl] = useState(user?.photoUrl);
  const [name, setName] = useState(user?.name);

  const [isSelectPhotoModalOpen, setIsSelectPhotoModalOpen] = useState(false);
  const [isImageCropModalOpen, setIsImageCropModalOpen] = useState(false);
  const [croppedImageSource, setCroppedImageSource] = useState<string>();

  const [isSavingProfile, setIsSavingProfile] = useState(false);

  const profilePhotoUrl = useMemo(() => {
    if (croppedImageSource) return croppedImageSource;

    if (user && user.photoUrl && user.photoUrl.length > 0) return user.photoUrl;

    if (mode === 'light') return profileDefaultLight;
    return profileDefaultDark;
  }, [croppedImageSource, mode, user]);

  function handleSelectPhoto(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const newPhotoUrl = URL.createObjectURL(file);
      setPhotoUrl(newPhotoUrl);

      setIsSelectPhotoModalOpen(false);

      setIsImageCropModalOpen(true);
    }
  }

  const handleSaveProfile = useCallback(async () => {
    setIsSavingProfile(true);

    if (name && name !== user?.name && name.length > 0) {
      const success = await updateProfileName(name);

      if (success) {
        setName(user?.name);
      } else {
        alert('Error updating profile name!');
      }
    }

    if (croppedImageSource) {
      const success = await updateProfilePhoto(croppedImageSource);

      if (success) {
        setPhotoUrl(user?.photoUrl);
        setCroppedImageSource(undefined);
      } else {
        alert('Error updating profile photo!');
      }
    }

    setIsSavingProfile(false);

    alert('Profile updated!');
  }, [croppedImageSource, name, updateProfileName, updateProfilePhoto, user]);

  return (
    <Container>
      <BackButton
        containerStyle={{
          position: 'absolute',
          top: 32,
          left: 32,
        }}
      />

      <Title style={{ color: colors.profile.titleColor }}>Profile</Title>

      <PhotoContainer>
        <Photo src={profilePhotoUrl} alt="Profile" />
        <PhotoEditContainer onClick={() => setIsSelectPhotoModalOpen(true)}>
          <img src={EditIcon} alt="Edit" />
        </PhotoEditContainer>
      </PhotoContainer>

      <Input
        name="name"
        placeholder="Name"
        containerStyle={{ width: '80%', marginTop: 44 }}
        value={name}
        onChange={e => setName(e.target.value)}
      />

      <RectangleButton
        onClick={async () => await handleSaveProfile()}
        style={{ width: '80%', marginTop: 32 }}
      >
        Save
      </RectangleButton>

      <PhoneNumberInput
        name="phone"
        placeholder="Phone"
        containerStyle={{ width: '80%', marginTop: 44 }}
        value="+5516991635766"
        disabled
        onChange={() => {}}
        copyContentCallback={() => {
          navigator.clipboard.writeText('+5516991635766');
        }}
      />

      <RectangleButton
        backgroundColor="#FF4D4F"
        style={{ width: '80%', marginTop: 32 }}
        onClick={async () => await signOut()}
      >
        Logout
      </RectangleButton>

      <ImageCropModal
        isImageCropModalOpen={isImageCropModalOpen}
        setIsImageCropModalOpen={setIsImageCropModalOpen}
        croppedImageSource={croppedImageSource}
        setCroppedImageSource={setCroppedImageSource}
        imgSource={photoUrl ? photoUrl : ''}
      />

      <SelectPhotoModal
        isSelectPhotoModalOpen={isSelectPhotoModalOpen}
        setIsSelectPhotoModalOpen={setIsSelectPhotoModalOpen}
        handleSelectPhoto={handleSelectPhoto}
      />

      <LoadingModal isOpen={isSavingProfile} setIsOpen={setIsSavingProfile} />
    </Container>
  );
}
