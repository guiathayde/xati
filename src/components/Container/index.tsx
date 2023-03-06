import { useWindowDimensions } from '../../hooks/windowDimensions';
import { useColorMode } from '../../hooks/colorMode';

import { Container as Div } from './styles';

interface ContainerProps {
  children: React.ReactNode;
}

export function Container({ children }: ContainerProps) {
  const { isMobile } = useWindowDimensions();
  const { colors } = useColorMode();

  return (
    <Div isMobile={isMobile} backgroundColor={colors.background}>
      {children}
    </Div>
  );
}
