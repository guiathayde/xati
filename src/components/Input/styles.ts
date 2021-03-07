import styled, { css } from 'styled-components';
import { Image, TextInput, View } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

interface ContainerProps {
  isFocused: boolean;
  isErrored: boolean;
}

export const Container = styled(View)<ContainerProps>`
  width: 100%;
  height: 60px;
  padding: 0 16px;
  background: #fff;
  border-radius: 10px;
  margin-bottom: 10px;
  border-width: 1px;
  border-color: #aab0b7;

  flex-direction: row;
  align-items: center;

  ${props =>
    props.isErrored &&
    css`
      border-color: #c53030;
    `}

  ${props =>
    props.isFocused &&
    css`
      border-color: #377dff;
    `}
`;

export const InputText = styled(TextInput)`
  flex: 1;
  color: #000;
  font-size: 16px;
  font-family: 'Inter-Regular';
`;

export const SendButton = styled(RectButton)`
  width: 24px;
  height: 24px;
`;

export const SendIcon = styled(Image)`
  width: 24px;
  height: 24px;
  padding: 4px;
`;
