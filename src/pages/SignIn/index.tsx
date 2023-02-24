import { useNavigate } from 'react-router-dom';

import { useColorMode } from '../../hooks/colorMode';
import { useWindowDimensions } from '../../hooks/windowDimensions';

import { Container } from '../../components/Container';
import { LogoText } from '../../components/LogoText';

import { Button } from './styles';

export function SignIn() {
  const navigate = useNavigate();
  const { colors } = useColorMode();
  const { height } = useWindowDimensions();

  return (
    <Container>
      <LogoText containerStyle={{ marginTop: height * 0.3 }} />

      <Button
        background={colors.signin.buttonBackground}
        onClick={() => navigate('/code-phone-number')}
      >
        Sign in with your phone number
      </Button>
    </Container>
  );
}
