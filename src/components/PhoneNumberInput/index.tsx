import { CSSProperties, InputHTMLAttributes, useState } from 'react';
import { DefaultInputComponentProps } from 'react-phone-number-input';

import {
  InputWithCountrySelect,
  InputWithoutCountrySelectContainer,
  InputWithoutCountrySelect,
  IconButton,
} from './styles';

interface PhoneNumberInputType extends DefaultInputComponentProps {
  containerStyle?: CSSProperties;
  hasCountrySelect?: boolean;

  copyContentCallback?: () => void;
}

type PhoneNumberInputProps = PhoneNumberInputType &
  Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'>;

export function PhoneNumberInput({
  containerStyle,
  hasCountrySelect = false,
  copyContentCallback,
  ...rest
}: PhoneNumberInputProps) {
  const [isFocused, setIsFocused] = useState(false);

  return hasCountrySelect ? (
    <InputWithCountrySelect
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      isFocused={isFocused}
      {...rest}
    />
  ) : (
    <InputWithoutCountrySelectContainer
      style={containerStyle}
      isFocused={isFocused}
    >
      <InputWithoutCountrySelect
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        {...rest}
      />

      {copyContentCallback && (
        <IconButton onClick={copyContentCallback}>
          <i className="material-icons">content_copy</i>
        </IconButton>
      )}
    </InputWithoutCountrySelectContainer>
  );
}
