import { ButtonHTMLAttributes, ReactNode } from 'react';

import { Container } from './styles';

interface RectangleButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export function RectangleButton({ children, ...rest }: RectangleButtonProps) {
  return <Container {...rest}>{children}</Container>;
}
