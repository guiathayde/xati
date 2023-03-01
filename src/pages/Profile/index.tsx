import { ChangeEvent, useState } from 'react';

import { useColorMode } from '../../hooks/colorMode';

import { Container } from '../../components/Container';
import { BackButton } from '../../components/BackButton';
import { Input } from '../../components/Input';
import { PhoneNumberInput } from '../../components/PhoneNumberInput';
import { RectangleButton } from '../../components/RectangleButton';

import { Title, PhotoContainer, Photo, PhotoEditContainer } from './styles';

import EditIcon from '../../assets/pages/profile/edit.svg';

export function Profile() {
  const { colors } = useColorMode();

  const [photoUrl, setPhotoUrl] = useState('https://i.imgur.com/SMB38Jk.jpg');

  function handleCapture(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const newUrl = URL.createObjectURL(file);
      setPhotoUrl(newUrl);
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
        <Photo src={photoUrl} alt="Profile" />
        <PhotoEditContainer htmlFor="profile-photo">
          <img src={EditIcon} alt="Edit" />
          <input
            id="profile-photo"
            accept="image/*"
            type="file"
            capture="environment"
            onChange={e => handleCapture(e)}
          />
        </PhotoEditContainer>
      </PhotoContainer>

      <Input
        name="name"
        placeholder="Name"
        containerStyle={{ width: '80%', marginTop: 44 }}
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
      />

      <RectangleButton
        backgroundColor="#FF4D4F"
        style={{ width: '80%', marginTop: 32 }}
      >
        Logout
      </RectangleButton>
    </Container>
  );
}
