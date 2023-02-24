import { InputHTMLAttributes, useRef, useState, CSSProperties } from 'react';

import { Container } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  containerStyle?: CSSProperties;
}

export function Input({ name, containerStyle, ...rest }: InputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [isFocused, setIsFocused] = useState(false);

  return (
    <Container style={containerStyle} isFocused={isFocused}>
      <input
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        ref={inputRef}
        {...rest}
      />
    </Container>
  );
}
