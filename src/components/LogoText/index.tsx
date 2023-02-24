import { CSSProperties } from 'react';

import { useColorMode } from '../../hooks/colorMode';

import { Container, Text } from './styles';

interface LogoTextProps {
  containerStyle?: CSSProperties;
}

export function LogoText({ containerStyle }: LogoTextProps) {
  const { colors } = useColorMode();

  return (
    <Container style={containerStyle}>
      <Text color={colors.signin.logoTextColor}>Xati</Text>
      <Text color={colors.signin.logoDotColor}>.</Text>
    </Container>
  );
}
