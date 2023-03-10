import { InputHTMLAttributes, useRef, useState, CSSProperties } from 'react';

import { Container, SendButton } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  containerStyle?: CSSProperties;

  hasSendButton?: boolean;
  onSend?: () => void;
}

export function Input({
  name,
  containerStyle,
  hasSendButton = false,
  onSend,
  ...rest
}: InputProps) {
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
      {hasSendButton && (
        <SendButton onClick={onSend}>
          <i className="material-icons">send</i>
        </SendButton>
      )}
    </Container>
  );
}
