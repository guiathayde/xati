import styled from 'styled-components';
import {
  FlatList,
  Image,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import Androw from 'react-native-androw';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { IChat } from './index';

const statusBarHeight = StatusBar.currentHeight;

const windowHeight = Dimensions.get('window').height;

export const Container = styled(View)`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  background: #fff;
`;

export const BoxShadowProfile = styled(Androw)`
  width: 64px;
  height: 64px;
  border-radius: 32px;
  margin-top: ${statusBarHeight + 24}px;
`;

export const Profile = styled(RectButton)`
  width: 64px;
  height: 64px;
  border-radius: 32px;
`;

export const ProfilePicture = styled(Image)`
  width: 64px;
  height: 64px;
  border-radius: 32px;
`;

export const LoadingView = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
  margin-top: ${windowHeight / 4}px;
`;

export const NoMessageText = styled(Text)`
  font-family: 'Inter-Bold';
  font-size: 24px;
  line-height: 29px;
  text-align: center;
  align-self: center;
  color: #243443;
  max-width: 80%;
  margin-top: ${windowHeight / 4}px;
`;

export const SearchUserMessageContainer = styled(View)`
  display: flex;
  position: absolute;
  bottom: 80px;
`;

export const SearchUserMessageText = styled(Text)`
  font-family: 'Inter-Bold';
  font-size: 20px;
  line-height: 24px;
  text-align: center;
  color: #243443;
`;

export const ArrowRightImage = styled(Image)`
  align-self: flex-end;
  margin-top: 16px;
  margin-right: 80px;
`;

export const ChatList = styled(FlatList as new () => FlatList<IChat>)`
  margin: 16px 16px;
`;

export const ChatContainer = styled(TouchableOpacity)`
  display: flex;
  flex-direction: row;
  width: 100%;
  margin-top: 16px;
  padding: 4px;
  max-height: 64px;
`;

export const ChatContent = styled(View)`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  padding-bottom: 4px;
  border-bottom-width: 1px;
  border-bottom-color: #f7f7f9;
`;

export const ChatAvatar = styled(Image)`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  margin-right: 12px;
`;

export const ChatData = styled(View)`
  width: 70%;
`;

export const ChatName = styled(Text)`
  font-family: 'Inter-SemiBold';
  font-size: 16px;
  line-height: 19px;
  color: #243443;
  width: 90%;
`;

export const ChatLastMessage = styled(Text)`
  font-family: 'Inter-Regular';
  font-size: 14px;
  line-height: 17px;
  color: #58616a;
  margin-top: 4px;
  padding-bottom: 4px;
  max-width: 90%;
`;

export const NewMessagesContainer = styled(View)`
  width: 20px;
  height: 20px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  align-self: center;
  background-color: #377dff;
`;

export const NewMessagesText = styled(Text)`
  font-family: 'Inter-Medium';
  font-size: 14px;
  line-height: 17px;
  color: #ffffff;
`;

export const ChatIcon = styled(Image)`
  margin-left: auto;
  align-self: center;
`;

export const BoxShadowButton = styled(Androw)`
  position: absolute;
  width: 80px;
  height: 80px;
  right: 20px;
  bottom: 20px;
  border-radius: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Button = styled(RectButton)`
  position: absolute;
  width: 80px;
  height: 80px;
  right: 20px;
  bottom: 20px;
  border-radius: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #377dff;
`;

export const NewChatImage = styled(Image)``;

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

export const ModalDeleteText = styled(Text)`
  font-family: 'Inter-SemiBold';
  font-size: 20px;
  line-height: 24px;
  text-align: center;
  color: #ff3737;
`;

export const ModalCancelText = styled(Text)`
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
  boxShadowProfile: {
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
  boxShadowButton: {
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 10,
  },
  containerChatList: {
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
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
