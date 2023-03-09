import styled from 'styled-components';
import { shade } from 'polished';

export const Title = styled.h3`
  font-weight: 700;
  font-size: 16px;
  line-height: 19px;
  text-align: center;
  color: #243443;

  margin-top: 44px;
  margin-left: auto;
  margin-right: auto;
`;

export const InputField = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;

  width: 100%;

  margin-top: 32px;
`;

export const SearchButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 54px;
  height: 54px;

  background: #377dff;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  border: none;
  border-radius: 50%;

  &:hover {
    background: ${shade(0.2, '#377DFF')};
  }

  i {
    color: #fff;
    font-size: 32px;
  }
`;

export const UserNotFound = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  margin: auto;
`;

export const BoldText = styled.span`
  font-style: normal;
  font-weight: 700;
  font-size: 30px;
  line-height: 36px;
  text-align: center;
  color: #243443;
`;

export const Emoji = styled.div`
  font-size: 64px;
`;

export const UserContact = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;

  width: 100%;

  margin-top: 32px;

  padding: 16px 24px;

  border-bottom: 1px solid #e5e5e5;

  &:hover {
    transform: translateX(10px);
    cursor: pointer;
  }

  img {
    width: 54px;
    height: 54px;
    border-radius: 50%;
    object-fit: cover;
  }

  span {
    max-width: 100%;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    font-weight: 600;
    font-size: 16px;
    line-height: 19px;
    color: #243443;

    margin: 0 auto;
  }

  i {
    font-size: 24px;
    color: #243443;
  }
`;
