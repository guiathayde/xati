import styled from 'styled-components';

interface ContainerProps {
  backgroundColor: string;
}

export const Container = styled.div<ContainerProps>`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100vw;
  height: 100vh;

  max-width: 425px;
  max-height: 700px;

  background-color: ${({ backgroundColor }) => backgroundColor};
`;
