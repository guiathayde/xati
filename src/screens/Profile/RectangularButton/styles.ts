import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';

interface ContainerProps {
  backgroundColor: string;
}

export const Container = styled.TouchableOpacity<ContainerProps>`
  align-items: center;
  justify-content: center;

  width: 100%;

  background-color: ${props => props.backgroundColor};

  padding: 16px 4px 16px 4px;

  border-radius: 8px;
`;

export const ButtonText = styled.Text`
  font-family: 'Inter-Medium';
  font-size: 18px;
  line-height: 22px;
  text-align: center;
  background-clip: text;
  color: white;
`;
