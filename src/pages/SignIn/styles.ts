import styled from 'styled-components';
import {
  Image,
  Text,
  View,
  StatusBar,
  KeyboardAvoidingView,
  StyleSheet,
} from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

const statusBarHeight = StatusBar.currentHeight;

export const Container = styled(View)`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  background: #f7f7f9;
`;
export const BackButton = styled(RectButton)`
  /* position: absolute;
  top: 64px;
  left: 16px; */
  margin-top: ${statusBarHeight + 24}px;
  margin-left: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  align-self: baseline;
`;

export const BackIcon = styled(Image)``;

export const BackButtonText = styled(Text)`
  font-family: 'Inter-Bold';
  font-size: 16px;
  line-height: 19px;
  color: #377dff;
  margin-left: 4px;
`;

export const LogoImage = styled(Image)`
  margin-top: 64px;
  margin-bottom: 80px;
  align-self: center;
`;

export const FormContent = styled(KeyboardAvoidingView)`
  width: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const RegisterText = styled(Text)`
  font-family: 'Inter-SemiBold';
  font-size: 18px;
  line-height: 22px;
  text-align: center;
  color: #243443;
  margin-bottom: 32px;
`;

export const ForgotPasswordButton = styled(RectButton)`
  align-self: center;
  margin-top: 8px;
  padding: 4px;
`;

export const ForgotPasswordText = styled(Text)`
  font-family: 'Inter-Medium';
  font-size: 12px;
  line-height: 15px;
  text-decoration-line: underline;
  color: #243443;
`;

export const Button = styled(RectButton)`
  margin: 64px 0;
  width: 100%;
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
    minWidth: '80%',
    display: 'flex',
    justifyContent: 'center',
  },
});

/*display: 'flex',
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    marginTop: 64,
    backgroundColor: '#f7f7f9',*/
