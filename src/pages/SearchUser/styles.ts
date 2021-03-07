import styled from 'styled-components';
import {
  Image,
  StyleSheet,
  Text,
  View,
  StatusBar,
  Dimensions,
} from 'react-native';
import { FlatList, RectButton } from 'react-native-gesture-handler';
import Androw from 'react-native-androw';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { User } from './index';

const statusBarHeight = StatusBar.currentHeight;

const windowHeight = Dimensions.get('window').height;

export const Container = styled(View)`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  background: #fff;
`;

export const Header = styled(View)`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: ${statusBarHeight + 24}px;
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

export const TitleText = styled(Text)`
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

export const FormContent = styled(View)`
  width: 90%;
  margin-top: 32px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const LoadingView = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
  margin-top: ${windowHeight / 2}px;
`;

export const UserNotFoundView = styled(View)`
  margin-top: ${windowHeight / 4}px;
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 80%;
`;

export const UserNotFoundText = styled(Text)`
  font-family: 'Inter-Bold';
  font-size: 30px;
  line-height: 36px;
  text-align: center;
  color: #243443;
`;

export const SadEmoji = styled(Image)`
  width: 86px;
  height: 86px;
  margin-top: 16px;
`;

export const BoxShadowButton = styled(Androw)`
  margin-left: 8px;
  align-self: center;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 64px;
  height: 64px;
`;

export const Button = styled(RectButton)`
  margin-left: 8px;
  align-self: center;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #377dff;
  width: 64px;
  height: 64px;
  border-radius: 32px;
`;

export const ButtonIconImage = styled(Image)`
  width: 32px;
  height: 32px;
`;

export const UsersList = styled(FlatList as new () => FlatList<User>)`
  margin: 16px 16px;
`;

export const UserContainer = styled(RectButton)`
  display: flex;
  flex-direction: row;
  width: 100%;
  margin-top: 16px;
  padding: 4px;
  max-height: 64px;
`;

export const UserContent = styled(View)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  padding-bottom: 4px;
  border-bottom-width: 1px;
  border-bottom-color: #f7f7f9;
`;

export const UserName = styled(Text)`
  font-family: 'Inter-SemiBold';
  font-size: 18px;
  line-height: 19px;
  color: #243443;
`;

export const UserAvatar = styled(Image)`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  background-color: #377dff;
`;

export const styles = StyleSheet.create({
  boxShadowButton: {
    shadowColor: 'red',
    shadowOffset: {
      width: 10,
      height: 10,
    },
    shadowOpacity: 1,
    shadowRadius: 10,
  },
  form: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    width: '80%',
    marginTop: 'auto',
    marginBottom: 'auto',
  },
});
