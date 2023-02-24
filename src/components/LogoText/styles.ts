import styled from 'styled-components';

interface LogoTextProps {
  color: string;
}

export const Container = styled.div`
  display: flex;
`;

export const Text = styled.h1<LogoTextProps>`
  font-size: 60px;
  line-height: 73px;
  color: ${({ color }) => color};
`;
