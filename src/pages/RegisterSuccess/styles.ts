import styled from 'styled-components';
import { Image, Text, View } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled(View)`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  background: #fff;
`;

export const LogoImage = styled(Image)`
  margin-top: 160px;
  margin-bottom: 80px;
`;

export const CheckImage = styled(Image)`
  width: 54px;
  height: 37px;
  margin-bottom: 30px;
`;

export const SuccessText = styled(Text)`
  font-family: 'Inter-Bold';
  font-size: 30px;
  line-height: 36px;
  text-align: center;
  color: #243443;
  margin-bottom: 20px;
  max-width: 80%;
`;

export const Button = styled(RectButton)`
  margin: 20px 0;
  width: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #377dff;
  border-radius: 8px;
`;

export const ButtonText = styled(Text)`
  padding: 16px 0;
  font-family: 'Inter-Medium';
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
  color: #fff;
`;
