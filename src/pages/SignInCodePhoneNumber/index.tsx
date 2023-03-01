import { useCallback, useState } from 'react';
import {
  isValidPhoneNumber,
  formatPhoneNumberIntl,
} from 'react-phone-number-input';

import { useColorMode } from '../../hooks/colorMode';

import { Container } from '../../components/Container';
import { BackButton } from '../../components/BackButton';
import { LogoText } from '../../components/LogoText';
import { PhoneNumberInput } from '../../components/PhoneNumberInput';
import { RectangleButton } from '../../components/RectangleButton';
import { Input } from '../../components/Input';

import { Title } from './styles';

export function SignInCodePhoneNumber() {
  const { colors } = useColorMode();

  const [phoneNumber, setPhoneNumber] = useState<string>();
  const [hasSentCode, setHasSentCode] = useState(false);
  const [code, setCode] = useState<string>();

  const onSendPhoneNumber = useCallback(async () => {
    if (phoneNumber && isValidPhoneNumber(phoneNumber)) {
      console.log(formatPhoneNumberIntl(phoneNumber));
      setHasSentCode(true);
    } else alert('Please enter a valid phone number');
  }, [phoneNumber]);

  const onSendCode = useCallback(async () => {
    if (code) {
      console.log(code);
    } else alert('Please enter the code sent to your phone');
  }, [code]);

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

      {hasSentCode ? (
        <>
          <Title style={{ color: colors.signInCodePhoneNumber.titleColor }}>
            Enter the code sent to your phone number
          </Title>

          <Input
            name="code"
            placeholder="Enter code"
            maxLength={6}
            onChange={e => setCode(e.target.value)}
            containerStyle={{
              width: '80%',
              marginTop: 32,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            style={{
              letterSpacing: code ? 24 : 0,
              marginRight: code ? 0 : -4,
              textAlign: code ? 'center' : 'left',
            }}
          />

          <RectangleButton
            onClick={async () => await onSendCode()}
            style={{ width: '80%', marginTop: 'auto', marginBottom: 'auto' }}
          >
            Continue
          </RectangleButton>
        </>
      ) : (
        <>
          <Title style={{ color: colors.signInCodePhoneNumber.titleColor }}>
            Continue with phone number
          </Title>

          <PhoneNumberInput
            hasCountrySelect
            placeholder="Enter phone number"
            onChange={setPhoneNumber}
          />

          <RectangleButton
            onClick={async () => await onSendPhoneNumber()}
            style={{ width: '80%', marginTop: 'auto', marginBottom: 'auto' }}
          >
            Continue
          </RectangleButton>
        </>
      )}
    </Container>
  );
}
