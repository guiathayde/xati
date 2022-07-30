import styled from 'styled-components/native';

interface ContainerProps {
  backgroundColor: string;
}

export const Container = styled.View<ContainerProps>`
  flex: 1;
  align-items: center;
  background-color: ${props => props.backgroundColor};
`;
