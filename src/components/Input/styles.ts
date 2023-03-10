import styled, { css } from 'styled-components';

interface ContainerProps {
  isFocused: boolean;
}

export const Container = styled.div<ContainerProps>`
  background: #fff;
  padding: 16px;
  width: 100%;

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

  display: flex;
  align-items: center;

  & + div {
    margin-top: 8px;
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

export const SendButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  margin-left: 8px;
  padding: 8px;

  background: transparent;

  border: none;

  width: 24px;
  height: 24px;

  &:hover {
    opacity: 0.8;
  }

  i {
    color: #aab0b7;
  }
`;
