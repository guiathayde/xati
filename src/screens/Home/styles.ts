import styled from 'styled-components/native';

interface ContainerProps {
  backgroundColor: string;
}

interface NoChatFoundProps {
  color: string;
}

interface FindUsersHereTextProps {
  color: string;
}

export const Container = styled.View<ContainerProps>`
  flex: 1;
  position: relative;
  align-items: center;

  background-color: ${props => props.backgroundColor};
`;

export const Profile = styled.TouchableOpacity`
  width: 64px;
  height: 64px;

  margin-top: 32px;

  border-radius: 32px;
`;

export const ProfilePhoto = styled.Image`
  width: 64px;
  height: 64px;

  border-radius: 32px;
`;

export const NoChatFound = styled.Text<NoChatFoundProps>`
  position: absolute;
  top: 50%;

  font-family: 'Inter-Bold';
  font-size: 24px;
  line-height: 29px;
  color: ${props => props.color};

  text-align: center;
`;

export const FindUsersHereContainer = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  position: absolute;
  bottom: 54px;
  left: 50%;
`;

export const FindUsersHereText = styled.Text<FindUsersHereTextProps>`
  font-family: 'Inter-Bold';
  font-size: 20px;
  line-height: 24px;
  color: ${props => props.color};

  text-align: center;

  margin-bottom: 8px;
`;

export const FindUsersHereArrow = styled.Image`
  width: 32px;
  height: 32px;
`;

export const SearchUserButton = styled.TouchableOpacity`
  position: absolute;
  bottom: 24px;
  right: 24px;

  width: 64px;
  height: 64px;
  align-items: center;
  justify-content: center;

  border-width: 1px;
  border-color: rgba(0, 0, 0, 0.2);
  border-radius: 32px;

  background-color: #377dff;
`;

export const SearchUserIcon = styled.Image`
  width: 32px;
  height: 32px;
`;
