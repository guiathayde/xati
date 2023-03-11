import styled from 'styled-components';

interface ButtonProps {
  background: string;
}

export const Button = styled.button<ButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;

  margin-top: 24px;
  padding: 16px 24px;

  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
  color: #243443;

  border: none;
  background: ${({ background }) => background};
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.1);
  border-radius: 8px;

  &:hover {
    cursor: pointer;
    opacity: 0.8;
  }
`;
