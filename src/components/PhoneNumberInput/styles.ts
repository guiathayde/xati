import styled, { css } from 'styled-components';
import PhoneInputWithCountrySelect from 'react-phone-number-input';
import PhoneInputWithoutCountrySelect from 'react-phone-number-input/input';

interface InputWithCountrySelectProps {
  isFocused: boolean;
}

interface InputWithCountrySelectContainerProps {
  isFocused: boolean;
}

export const InputWithCountrySelect = styled(PhoneInputWithCountrySelect)<InputWithCountrySelectProps>`
  display: flex;
  align-items: center;

  background: #fff;
  padding: 16px;
  width: 80%;

  margin-top: 32px;

  border-style: solid;
  ${({ isFocused }) =>
    isFocused
      ? css`
          border-width: 2px;
          border-color: #377dff;
        `
      : css`
          border-width: 1px;
          border-color: #aab0b7;
        `}

  border-radius: 10px;
  color: #243443;

  .PhoneInputCountry {
    padding: 2px 0;
    padding-right: 8px;
    margin-right: 8px;

    border-right: 1px solid #243443;

    .PhoneInputCountryIcon {
      width: 32px;
      height: 21.33px;
    }

    .PhoneInputCountrySelect {
      display: none;
    }
    .PhoneInputCountrySelectArrow {
      display: none;
    }
  }

  input {
    flex: 1;
    background: transparent;
    border: 0;
    color: #243443;

    &::placeholder {
      color: #aab0b7;
    }
  }
`;

export const InputWithCountrySelectContainer = styled.div<InputWithCountrySelectContainerProps>`
  background: #fff;
  padding: 16px;
  width: 80%;

  margin-top: 32px;

  border-style: solid;
  ${({ isFocused }) =>
    isFocused
      ? css`
          border-width: 2px;
          border-color: #377dff;
        `
      : css`
          border-width: 1px;
          border-color: #aab0b7;
        `}

  border-radius: 10px;
  color: #243443;
`;

export const InputWithoutCountrySelect = styled(PhoneInputWithoutCountrySelect)`
  flex: 1;
  background: transparent;
  border: 0;
  color: #243443;

  &::placeholder {
    color: #aab0b7;
  }
`;
