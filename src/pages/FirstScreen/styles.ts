import styled from 'styled-components';
import { Image, StyleSheet, Text, View } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled(View)`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #f7f7f9;
`;

export const LogoImage = styled(Image)`
  margin-bottom: 80px;
`;

export const Content = styled(View)`
  width: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Button = styled(RectButton)`
  margin: 20px 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  border-radius: 8px;
`;

export const ButtonText = styled(Text)`
  padding: 16px 0;
  font-family: 'Inter-Medium';
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
  color: #243443;
`;

export const Separator = styled(Image)``;

export const styles = StyleSheet.create({
  dropShadow: {
    width: '100%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
});
