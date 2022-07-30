import styled from 'styled-components/native';

interface ContainerProps {
  backgroundColor: string;
}

export const Container = styled.View<ContainerProps>`
  width: 100%;
  height: 54px;
  align-items: center;
  justify-content: center;
  flex-direction: row;

  border: 1px solid #aab0b7;
  border-radius: 8px;

  background-color: ${props => props.backgroundColor};
`;

export const TextInput = styled.TextInput`
  flex: 1;

  padding: 0px 16px 0px 16px;

  font-size: 16px;
`;

export const IconInputContainer = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
`;

export const IconInput = styled.Image`
  width: 24px;
  height: 24px;

  margin-right: 16px;
`;
