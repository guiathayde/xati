import styled from 'styled-components';
import {
  Image,
  Text,
  View,
  StatusBar,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

const statusBarHeight = StatusBar.currentHeight;

const windowWidth = Dimensions.get('window').width;

export const Container = styled(View)`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  background: #ffffff;
`;

export const Header = styled(View)`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: ${statusBarHeight + 24}px;
  width: 100%;
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

export const LoadingView = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
  align-self: center;
  position: absolute;
`;

export const ProfilePicture = styled(Image)`
  width: ${windowWidth * 0.7}px;
  height: ${windowWidth * 0.7}px;
  border-radius: ${(windowWidth * 0.7) / 2}px;
  align-self: center;
  margin: 32px 0;
  background-color: #377dff;
`;

export const ChangeProfilePicture = styled(RectButton)`
  position: absolute;
  width: 64px;
  height: 64px;
  background: #377dff;
  border-radius: 32px;
  right: 10px;
  bottom: 30px;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ChangeProfilePictureImage = styled(Image)`
  width: 24px;
  height: 24px;
`;

export const Button = styled(RectButton)`
  margin: 32px 0;
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
  },
});
