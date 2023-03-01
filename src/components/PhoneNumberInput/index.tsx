import { CSSProperties, useState } from 'react';
import { DefaultInputComponentProps } from 'react-phone-number-input';

import {
  InputWithCountrySelect,
  InputWithCountrySelectContainer,
  InputWithoutCountrySelect,
} from './styles';

interface PhoneNumberInputProps extends DefaultInputComponentProps {
  containerStyle?: CSSProperties;
  hasCountrySelect?: boolean;
}

export function PhoneNumberInput({
  containerStyle,
  hasCountrySelect = false,
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
    <InputWithCountrySelectContainer
      style={containerStyle}
      isFocused={isFocused}
    >
      <InputWithoutCountrySelect
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        {...rest}
      />
    </InputWithCountrySelectContainer>
  );
}
