import styled from 'styled-components/native';

interface HeaderTitleProps {
  color: string;
}

export const Container = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;

  width: 90%;

  position: relative;

  margin-top: 44px;
`;

export const HeaderTitle = styled.Text<HeaderTitleProps>`
  font-family: 'Inter-Bold';
  font-size: 16px;
  line-height: 19px;
  text-align: center;

  color: ${props => props.color};

  position: absolute;

  left: 50%;
`;

export const HeaderImage = styled.Image`
  width: 50px;
  height: 50px;

  border-radius: 25px;

  position: absolute;

  right: 16px;
`;
