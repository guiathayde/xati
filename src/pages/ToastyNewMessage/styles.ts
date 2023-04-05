import styled from 'styled-components';
import { lighten } from 'polished';

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
