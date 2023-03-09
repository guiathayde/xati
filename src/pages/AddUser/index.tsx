import { useCallback, useState } from 'react';
import { isValidPhoneNumber } from 'react-phone-number-input';

import { useColorMode } from '../../hooks/colorMode';

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

export function AddUser() {
  const { colors } = useColorMode();

  const [phoneNumber, setPhoneNumber] = useState('');
  const [userNotFound, setUserNotFound] = useState(false);
  const [user, setUser] = useState<string>();

  const handleSearchUser = useCallback(() => {
    setUserNotFound(false);

    if (phoneNumber.length > 0 && isValidPhoneNumber(phoneNumber)) {
      console.log(phoneNumber);
      // Search user by phone number
      // If user not found, show UserNotFound
      // If user found, show UserFound
      setUser('user');
    } else {
      console.log('Invalid phone number');
      setUserNotFound(true);
    }
  }, [phoneNumber]);

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

        <SearchButton onClick={handleSearchUser}>
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

      {!userNotFound && user && (
        <UserContact>
          <img src="https://i.imgur.com/SMB38Jk.jpg" alt="Profile User" />

          <span>Caio Affonso Athayde</span>

          <i className="material-icons">keyboard_arrow_right</i>
        </UserContact>
      )}
    </Container>
  );
}
