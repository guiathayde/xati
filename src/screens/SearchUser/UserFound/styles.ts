import styled from 'styled-components/native';

interface NameTextProps {
  color: string;
}

export const Container = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  align-items: center;

  position: relative;

  width: 100%;

  padding: 4px;

  margin-top: 32px;
`;

export const Photo = styled.Image`
  width: 50px;
  height: 50px;

  border-radius: 25px;

  margin-left: 28px;
  margin-right: 12px;
`;

export const NameText = styled.Text<NameTextProps>`
  font-family: 'Inter-Bold';
  line-height: 19px;

  color: ${props => props.color};

  position: absolute;
  left: 50%;
`;

export const ChevronRight = styled.Image`
  width: 24px;
  height: 24px;

  margin-left: auto;
  margin-right: 14px;
`;

export const Divider = styled.View`
  width: 100%;
  height: 1px;
  background-color: #d2d2d2;
`;
