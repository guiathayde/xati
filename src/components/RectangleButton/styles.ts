import styled from 'styled-components';
import { shade } from 'polished';

interface ContainerProps {
  backgroundColor?: string;
}

export const Container = styled.button<ContainerProps>`
  display: flex;
  align-items: center;
  justify-content: center;

  padding: 16px;

  width: 100%;

  background-color: ${({ backgroundColor }) => backgroundColor || '#377dff'};
  border: none;
  border-radius: 8px;

  color: #fff;

  font-weight: 500;
  font-size: 18px;
  line-height: 22px;
  text-align: center;

  &:hover {
    background-color: ${({ backgroundColor }) =>
      shade(0.2, backgroundColor || '#377dff')};
  }
`;
