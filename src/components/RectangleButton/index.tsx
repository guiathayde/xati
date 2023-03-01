import { ButtonHTMLAttributes, ReactNode } from 'react';

import { Container } from './styles';

interface RectangleButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  backgroundColor?: string;
  children: ReactNode;
}

export function RectangleButton({
  backgroundColor = '#377dff',
  children,
  ...rest
}: RectangleButtonProps) {
  return (
    <Container backgroundColor={backgroundColor} {...rest}>
      {children}
    </Container>
  );
}
