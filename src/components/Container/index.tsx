import { useColorMode } from '../../hooks/colorMode';

import { Container as Div } from './styles';

interface ContainerProps {
  children: React.ReactNode;
}

export function Container({ children }: ContainerProps) {
  const { colors } = useColorMode();

  return <Div backgroundColor={colors.background}>{children}</Div>;
}
