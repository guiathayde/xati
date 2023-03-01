import styled, { css } from 'styled-components';

interface ContainerProps {
  backgroundColor: string;
  isMobile: boolean;
}

export const Container = styled.div<ContainerProps>`
  position: relative;
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;

  width: 100vw;
  height: 100%;

  max-width: 425px;
  max-height: 950px;

  background-color: ${({ backgroundColor }) => backgroundColor};

  ${({ isMobile }) =>
    !isMobile &&
    css`
      border-radius: 12px;
      max-height: 95vh;
    `}
`;
