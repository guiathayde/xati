import styled from 'styled-components/native';

interface ContainerProps {
  backgroundColor: string;
}

interface UserNotFoundTextProps {
  color: string;
}

export const Container = styled.View<ContainerProps>`
  flex: 1;
  position: relative;
  align-items: center;

  background-color: ${props => props.backgroundColor};
`;

export const SearchContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;

  width: 90%;

  margin-top: 24px;
`;

export const UserNotFoundText = styled.Text<UserNotFoundTextProps>`
  font-family: 'Inter-Bold';
  font-size: 30px;
  line-height: 36px;
  text-align: center;

  color: ${props => props.color};

  margin-top: 128px;
`;

export const UserNotFoundImage = styled.Image`
  width: 84px;
  height: 84px;

  margin-top: 16px;
`;
