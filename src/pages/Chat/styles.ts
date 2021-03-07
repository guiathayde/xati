import styled from 'styled-components';
import { Image, Text, View, StatusBar } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

const statusBarHeight = StatusBar.currentHeight;

export const Container = styled(View)`
  display: flex;
  flex: 1;
  flex-direction: column;
  background-color: #fff;
`;

export const Header = styled(View)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: ${statusBarHeight + 8}px;
  padding-bottom: 4px;
  width: 100%;
`;

export const BackButton = styled(RectButton)`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: 8px;
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

export const ChatNameText = styled(Text)`
  font-family: 'Inter-Bold';
  font-size: 18px;
  line-height: 19px;
  text-align: center;
  color: #243443;
  max-width: 50%;
`;

export const ChatProfileImage = styled(Image)`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  margin-right: 30px;
`;

export const ChatContainer = styled(View)`
  width: 90%;
  background-color: red;
`;
