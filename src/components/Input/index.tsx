import {
  InputHTMLAttributes,
  forwardRef,
  useState,
  CSSProperties,
} from 'react';

import { Container, SendButton } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  containerStyle?: CSSProperties;

  hasSendButton?: boolean;
  onSend?: () => void;
}

export const Input = forwardRef<any, InputProps>(
  ({ name, containerStyle, hasSendButton = false, onSend, ...rest }, ref) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
      <Container style={containerStyle} isFocused={isFocused}>
        <input
          ref={ref}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...rest}
        />
        {hasSendButton && (
          <SendButton onClick={onSend}>
            <i className="material-icons">send</i>
          </SendButton>
        )}
      </Container>
    );
  },
);
