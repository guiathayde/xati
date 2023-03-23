import { useColorMode } from '../../../../hooks/colorMode';

import { BackButton } from '../../../../components/BackButton';
import { LogoText } from '../../../../components/LogoText';
import { Input } from '../../../../components/Input';
import { RectangleButton } from '../../../../components/RectangleButton';

import { Title } from './styles';
import { useCallback } from 'react';

interface EnterCodeProps {
  onClickBack: () => void;
  code?: string;
  setCode: React.Dispatch<React.SetStateAction<string | undefined>>;
  onSendCode: () => Promise<void>;
}

export function EnterCode({
  onClickBack,
  code,
  setCode,
  onSendCode,
}: EnterCodeProps) {
  const { colors } = useColorMode();

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') onSendCode();
    },
    [onSendCode],
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
        Enter the code sent to your phone number
      </Title>

      <Input
        name="code"
        placeholder="Enter code"
        autoFocus
        maxLength={6}
        onChange={e => setCode(e.target.value)}
        onKeyDown={e => handleKeyDown(e)}
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
  );
}
