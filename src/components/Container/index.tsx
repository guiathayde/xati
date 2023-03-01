import { useEffect, useState } from 'react';
import { useColorMode } from '../../hooks/colorMode';

import { Container as Div } from './styles';

interface ContainerProps {
  children: React.ReactNode;
}

export function Container({ children }: ContainerProps) {
  const { colors } = useColorMode();

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent));
  }, []);

  return (
    <Div isMobile={isMobile} backgroundColor={colors.background}>
      {children}
    </Div>
  );
}
