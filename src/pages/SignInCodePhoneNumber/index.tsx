import { useCallback, useState } from 'react';
import {
  isValidPhoneNumber,
  formatPhoneNumberIntl,
} from 'react-phone-number-input';

import { useColorMode } from '../../hooks/colorMode';

import { Container } from '../../components/Container';
import { BackButton } from '../../components/BackButton';
import { LogoText } from '../../components/LogoText';
import { RectangleButton } from '../../components/RectangleButton';

import { Title, PhoneNumberInput } from './styles';

export function SignInCodePhoneNumber() {
  const { colors } = useColorMode();

  const [isPhoneNumberInputFocused, setIsPhoneNumberInputFocused] =
    useState(false);
  const [phoneNumber, setPhoneNumber] = useState<string>();

  const onSubmit = useCallback(async () => {
    if (phoneNumber && isValidPhoneNumber(phoneNumber))
      console.log(formatPhoneNumberIntl(phoneNumber));
    else alert('Please enter a valid phone number');
  }, [phoneNumber]);

  return (
    <Container>
      <BackButton
        containerStyle={{
          alignSelf: 'flex-start',
          marginLeft: 32,
          marginTop: 32,
        }}
      />

      <LogoText containerStyle={{ marginTop: 16 }} />

      <Title style={{ color: colors.signInCodePhoneNumber.titleColor }}>
        Continue with phone number
      </Title>

      <PhoneNumberInput
        placeholder="Enter phone number"
        onFocus={() => setIsPhoneNumberInputFocused(true)}
        onBlur={() => setIsPhoneNumberInputFocused(false)}
        isFocused={isPhoneNumberInputFocused}
        onChange={setPhoneNumber}
      />

      <RectangleButton
        onClick={async () => await onSubmit()}
        style={{ width: '80%', marginTop: 'auto', marginBottom: 'auto' }}
      >
        Sign In
      </RectangleButton>
    </Container>
  );
}
