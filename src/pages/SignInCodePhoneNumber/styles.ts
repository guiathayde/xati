import styled, { css } from 'styled-components';
import PhoneInput from 'react-phone-number-input';

interface PhoneNumberInputProps {
  isFocused: boolean;
}

export const Title = styled.h3`
  font-weight: 700;
  font-size: 16px;
  line-height: 19px;
  text-align: center;

  margin-top: 32px;
`;

export const PhoneNumberInput = styled(PhoneInput)<PhoneNumberInputProps>`
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
          border-color: #243443;
        `}

  border-radius: 10px;
  color: #243443;

  display: flex;
  align-items: center;

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
