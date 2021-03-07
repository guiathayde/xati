import styled from 'styled-components';
import {
  Image,
  Text,
  View,
  StatusBar,
  StyleSheet,
  KeyboardAvoidingView,
} from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

const statusBarHeight = StatusBar.currentHeight;

export const Container = styled(View)`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #f7f7f9;
`;

export const BackButton = styled(RectButton)`
  margin-top: ${statusBarHeight + 24}px;
  margin-left: 20px;
  display: flex;
  align-self: baseline;
  flex-direction: row;
  align-items: center;
`;

export const BackIcon = styled(Image)``;

export const BackButtonText = styled(Text)`
  font-family: 'Inter-Bold';
  font-size: 16px;
  line-height: 19px;
  color: #377dff;
  margin-left: 4px;
`;

export const Content = styled(KeyboardAvoidingView)`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  margin-top: 64px;
  background: #f7f7f9;
`;

export const LogoImage = styled(Image)`
  margin-top: 22px;
  margin-bottom: 64px;
  align-self: center;
`;

export const FormContent = styled(View)`
  min-width: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const RegisterText = styled(Text)`
  font-family: 'Inter-SemiBold';
  font-weight: 600;
  font-size: 18px;
  line-height: 22px;
  text-align: center;
  color: #243443;
  margin-bottom: 32px;
`;

export const Button = styled(RectButton)`
  margin: 54px 0;
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

export const LoadingView = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const styles = StyleSheet.create({
  keyboardAvoidingScrollView: {
    display: 'flex',
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    marginTop: 8,
    backgroundColor: '#f7f7f9',
  },
});
