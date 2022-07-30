import styled from 'styled-components/native';

interface NameTextProps {
  color: string;
}

interface LastMessageTextProps {
  color: string;
}

interface TimeLastMessageTextProps {
  color: string;
}

export const Container = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  align-items: center;

  padding: 4px;
`;

export const Photo = styled.Image`
  width: 50px;
  height: 50px;

  border-radius: 25px;

  margin-right: 12px;
`;

export const NameAndLastMessageContainer = styled.View``;

export const NameText = styled.Text<NameTextProps>`
  font-family: 'Inter-Bold';
  line-height: 19px;

  color: ${props => props.color};
`;

export const LastMessageText = styled.Text<LastMessageTextProps>`
  font-family: 'Inter-Medium';
  line-height: 19px;

  color: ${props => props.color};
`;

export const TimeLastMessageAndNotificationContainer = styled.View`
  display: flex;
  align-items: center;

  margin-left: 8px;
  margin-right: 8px;
`;

export const TimeLastMessageText = styled.Text<TimeLastMessageTextProps>`
  font-family: 'Inter-Medium';
  font-size: 12px;
  line-height: 15px;

  color: ${props => props.color};

  margin-bottom: 4px;
`;

export const NotificationView = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 20px;
  height: 20px;

  border-radius: 10px;

  background-color: #377dff;
`;

export const NotificationText = styled.Text`
  font-family: 'Inter-SemiBold';
  font-size: 14px;
  line-height: 17px;
  text-align: center;
  color: #ffffff;
`;

export const ChevronRight = styled.Image`
  width: 24px;
  height: 24px;
`;

export const Divider = styled.View`
  width: 100%;
  height: 1px;
  background-color: #d2d2d2;
`;
