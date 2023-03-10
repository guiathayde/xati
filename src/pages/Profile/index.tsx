import { ChangeEvent, useState } from 'react';

import { useAuth } from '../../hooks/auth';
import { useColorMode } from '../../hooks/colorMode';

import { Container } from '../../components/Container';
import { BackButton } from '../../components/BackButton';
import { Input } from '../../components/Input';
import { PhoneNumberInput } from '../../components/PhoneNumberInput';
import { RectangleButton } from '../../components/RectangleButton';
import { ImageCropModal } from '../../components/ImageCropModal';
import { SelectPhotoModal } from './components/SelectPhotoModal';

import { Title, PhotoContainer, Photo, PhotoEditContainer } from './styles';

import EditIcon from '../../assets/pages/profile/edit.svg';

export function Profile() {
  const { user } = useAuth();
  const { colors } = useColorMode();

  const [photoUrl, setPhotoUrl] = useState(user?.avatar);
  const [name, setName] = useState(user?.name);
  const [isSelectPhotoModalOpen, setIsSelectPhotoModalOpen] = useState(false);
  const [isImageCropModalOpen, setIsImageCropModalOpen] = useState(false);
  const [croppedImageSource, setCroppedImageSource] = useState<string>();

  function handleSelectPhoto(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const newPhotoUrl = URL.createObjectURL(file);
      setPhotoUrl(newPhotoUrl);

      setIsSelectPhotoModalOpen(false);

      setIsImageCropModalOpen(true);
    }
  }

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
        <Photo
          src={croppedImageSource ? croppedImageSource : photoUrl}
          alt="Profile"
        />
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

      <RectangleButton style={{ width: '80%', marginTop: 32 }}>
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
    </Container>
  );
}
