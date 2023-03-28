import { useWindowDimensions } from '../../../../hooks/windowDimensions';
import { useColorMode } from '../../../../hooks/colorMode';
import { useTranslate } from '../../../../hooks/translate';

import { LogoText } from '../../../../components/LogoText';

import { Button } from './styles';

interface SignInWithPhoneProps {
  onClick: () => void;
}

export function SignInWithPhone({ onClick }: SignInWithPhoneProps) {
  const { height } = useWindowDimensions();
  const { colors } = useColorMode();
  const { strings } = useTranslate();

  return (
    <>
      <LogoText containerStyle={{ marginTop: height * 0.3 }} />

      <Button
        id="sign-in-button"
        background={colors.signin.buttonBackground}
        onClick={onClick}
      >
        {strings.signin.signinWithPhone.button}
      </Button>
    </>
  );
}
