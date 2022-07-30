import styled from 'styled-components/native';

interface SignInButtonProps {
  backgroundColor: string;
}

export const SignInButton = styled.TouchableOpacity<SignInButtonProps>`
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;

  width: 80%;

  margin-top: 64px;
  padding: 16px;

  background-color: ${props => props.backgroundColor};
  box-shadow: 0 2px 4px rgb(0 0 0 / 0.2);
  border-radius: 8px;
`;

export const SignInIcon = styled.Image`
  width: 24px;
  height: 24px;

  margin-left: 24px;
`;

export const SignInText = styled.Text`
  position: absolute;

  left: 50%;

  font-family: 'Inter-Medium';
  color: #243443;
`;
