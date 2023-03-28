import { useColorMode } from '../../../../hooks/colorMode';
import { useTranslate } from '../../.././../hooks/translate';

import { BackButton } from '../../../../components/BackButton';
import { LogoText } from '../../../../components/LogoText';
import { PhoneNumberInput } from '../../../../components/PhoneNumberInput';
import { RectangleButton } from '../../../../components/RectangleButton';

import { Title } from './styles';
import { useCallback } from 'react';

interface EnterPhoneNumberProps {
  onClickBack: () => void;
  setPhoneNumber: React.Dispatch<React.SetStateAction<string | undefined>>;
  onSendPhoneNumber: () => Promise<void>;
}

export function EnterPhoneNumber({
  onClickBack,
  setPhoneNumber,
  onSendPhoneNumber,
}: EnterPhoneNumberProps) {
  const { colors } = useColorMode();
  const { strings } = useTranslate();

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') onSendPhoneNumber();
    },
    [onSendPhoneNumber],
  );

  return (
    <>
      <BackButton
        onClick={onClickBack}
        containerStyle={{
          alignSelf: 'flex-start',
          marginLeft: 32,
          marginTop: 32,
        }}
      />

      <LogoText containerStyle={{ marginTop: 16 }} />

      <Title style={{ color: colors.signInCodePhoneNumber.titleColor }}>
        {strings.signin.enterPhoneNumber.title}
      </Title>

      <PhoneNumberInput
        hasCountrySelect
        placeholder={
          strings.signin.enterPhoneNumber.phoneNumberInputPlaceholder
        }
        onChange={setPhoneNumber}
        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
          handleKeyDown(e)
        }
      />

      <RectangleButton
        onClick={async () => await onSendPhoneNumber()}
        style={{ width: '80%', marginTop: 'auto', marginBottom: 'auto' }}
      >
        {strings.signin.enterPhoneNumber.button}
      </RectangleButton>
    </>
  );
}
