import { useCallback, useState } from 'react';
import { isValidPhoneNumber } from 'react-phone-number-input';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../../hooks/auth';
import { useColorMode } from '../../hooks/colorMode';

import { api } from '../../services/api';

import { Container } from '../../components/Container';
import { BackButton } from '../../components/BackButton';
import { PhoneNumberInput } from '../../components/PhoneNumberInput';

import {
  Title,
  InputField,
  SearchButton,
  UserNotFound,
  BoldText,
  Emoji,
  UserContact,
} from './styles';

import { User } from '../../interfaces/User';

export function AddUser() {
  const { user } = useAuth();
  const { colors } = useColorMode();
  const navigate = useNavigate();

  const [phoneNumber, setPhoneNumber] = useState('');
  const [userNotFound, setUserNotFound] = useState(false);
  const [userToAdd, setUserToAdd] = useState<User>();

  const handleSearchUser = useCallback(async () => {
    setUserNotFound(false);

    if (phoneNumber.length === 0) {
      alert('Phone number is required');
      return;
    }

    if (!isValidPhoneNumber(phoneNumber)) {
      alert('Invalid phone number');
      return;
    }

    try {
      const response = await api.get(`/users/phone/${phoneNumber}`);

      setUserToAdd(response.data);
    } catch (err) {
      setUserNotFound(true);
    }
  }, [phoneNumber]);

  const handleStartChat = useCallback(() => {
    if (!userToAdd) {
      return;
    }

    navigate(`/chat/${userToAdd.id}`);
  }, [navigate, userToAdd]);

  return (
    <Container>
      <BackButton
        containerStyle={{
          position: 'absolute',
          top: 32,
          left: 32,
        }}
      />

      <Title style={{ color: colors.addUser.titleColor }}>Profile</Title>

      <InputField>
        <PhoneNumberInput
          name="phone-number"
          placeholder="Enter phone number"
          containerStyle={{ width: '70%', margin: 0 }}
          onChange={setPhoneNumber}
        />

        <SearchButton onClick={async () => await handleSearchUser()}>
          <i className="material-icons">search</i>
        </SearchButton>
      </InputField>

      {userNotFound && (
        <UserNotFound>
          <BoldText style={{ color: colors.addUser.titleColor }}>
            User not found
          </BoldText>
          <Emoji>😔</Emoji>
        </UserNotFound>
      )}

      {userToAdd && user && userToAdd.id === user.id && (
        <UserNotFound>
          <BoldText style={{ color: colors.addUser.titleColor }}>
            Unable to talk to yourself
          </BoldText>
          <Emoji>😔</Emoji>
        </UserNotFound>
      )}

      {user && !userNotFound && userToAdd && userToAdd.id !== user.id && (
        <UserContact onClick={handleStartChat}>
          <img src={userToAdd.photoUrl} alt={userToAdd.name} />

          <span style={{ color: colors.addUser.titleColor }}>
            {userToAdd.name}
          </span>

          <i className="material-icons">keyboard_arrow_right</i>
        </UserContact>
      )}
    </Container>
  );
}
