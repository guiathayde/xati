import styled from 'styled-components';
import { lighten } from 'polished';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  width: ${425 * 0.8}px;

  background-color: white;

  border: 1px solid #e6ecf0;
  border-radius: 8px;
  box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
`;

export const InfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  width: 100%;

  padding: 16px;
`;

export const ProfileImage = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;

  object-fit: cover;
`;

export const NameMessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  margin-left: 16px;

  > strong {
    font-size: 16px;
    font-weight: 600;
    color: #243443;

    margin-bottom: 4px;
  }

  > span {
    font-size: 14px;
    font-weight: 400;
    color: ${lighten(0.2, '#243443')};
  }
`;

export const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  width: 74px;
  height: 100%;

  background-color: transparent;
`;

export const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 50%;

  background-color: transparent;

  border: 0.5px solid #e6ecf0;
  border-left: 1px solid #e6ecf0;
  border-radius: 0 8px 8px 0;

  font-size: 14px;
  color: #377dff;
`;
