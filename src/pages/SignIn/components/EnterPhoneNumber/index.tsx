import { useColorMode } from '../../../../hooks/colorMode';

import { BackButton } from '../../../../components/BackButton';
import { LogoText } from '../../../../components/LogoText';
import { PhoneNumberInput } from '../../../../components/PhoneNumberInput';
import { RectangleButton } from '../../../../components/RectangleButton';

import { Title } from './styles';

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
  );
}
