import styled from 'styled-components';
import {
  Image,
  Text,
  View,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

const statusBarHeight = StatusBar.currentHeight;

export const Container = styled(View)`
  display: flex;
  flex: 1;
  align-items: center;
  background: #f7f7f9;
`;

export const Header = styled(View)`
  margin-top: ${statusBarHeight + 24}px;
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
`;

export const BackButton = styled(RectButton)`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: 18px;
  padding: 4px;
`;

export const BackIcon = styled(Image)``;

export const BackButtonText = styled(Text)`
  font-family: 'Inter-Bold';
  font-size: 16px;
  line-height: 19px;
  color: #377dff;
  margin-left: 4px;
`;

export const ProfileText = styled(Text)`
  font-family: 'Inter-Bold';
  font-size: 18px;
  line-height: 19px;
  text-align: center;
  color: #243443;
  position: absolute;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  text-align: center;
`;

export const AvatarInput = styled(View)`
  margin-bottom: 32px;
  position: relative;
  align-self: center;
`;

export const ProfilePicture = styled(Image)`
  width: 186px;
  height: 186px;
  border-radius: 98px;
  align-self: center;
  margin: 32px 0;
`;

export const ChangeProfilePicture = styled(RectButton)`
  position: absolute;
  width: 48px;
  height: 48px;
  background: #377dff;
  border-radius: 24px;
  right: 10px;
  bottom: 30px;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ChangeProfilePictureImage = styled(Image)`
  width: 18px;
  height: 18px;
`;

export const LogoImage = styled(Image)`
  margin-bottom: 80px;
`;

export const FormContent = styled(View)`
  width: 80%;
  height: 100%;
  display: flex;
  align-items: center;
  padding-bottom: auto;
`;

export const Button = styled(RectButton)`
  margin: 32px 0;
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

export const ButtonLogout = styled(RectButton)`
  width: 100%;
  display: flex;
  margin-top: 40%;
  justify-content: center;
  align-items: center;
  background-color: #ff3737;
  border-radius: 8px;
`;

export const ModalContainer = styled(View)`
  position: absolute;
  bottom: 0;
  padding-top: 10px;
  padding-bottom: 40px;
  border-top-left-radius: 40px;
  border-top-right-radius: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: #f7f7f9;
  border-width: 1px;
  border-color: #377dff;
`;

export const ModalBar = styled(View)`
  width: 38px;
  height: 8px;
  background-color: #377dff;
  border-radius: 8px;
  margin-bottom: 16px;
`;

export const ModalButton = styled(TouchableOpacity)`
  width: 70%;
`;

export const ModalText = styled(Text)`
  font-family: 'Inter-SemiBold';
  font-size: 20px;
  line-height: 24px;
  text-align: center;
  color: #243443;
`;

export const ModalSeparator = styled(View)`
  width: 70%;
  height: 1px;
  background-color: #243443;
  margin: 8px 0;
`;

export const styles = StyleSheet.create({
  modal: {
    margin: 0,
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 5,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
});
