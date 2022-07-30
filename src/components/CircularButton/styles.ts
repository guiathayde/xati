import styled from 'styled-components/native';

interface ContainerProps {
  size: number;
  backgroundColor: string;
  hasElevation: boolean;
}

interface IconProps {
  width: number;
  height: number;
}

export const Container = styled.TouchableOpacity<ContainerProps>`
  width: ${props => props.size}px;
  height: ${props => props.size}px;

  align-items: center;
  justify-content: center;

  border-radius: ${props => props.size / 2}px;

  background-color: ${props => props.backgroundColor};

  ${props =>
    props.hasElevation && 'box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);'}
`;

export const Icon = styled.Image<IconProps>`
  width: ${props => props.width}px;
  height: ${props => props.height}px;
`;
