import styled from 'styled-components';
import { shade } from 'polished';
import { Link } from 'react-router-dom';

export const ProfileButton = styled.img`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  margin-top: 32px;
  object-fit: cover;

  &:hover {
    cursor: pointer;

    transform: scale(1.1);
  }
`;

export const BoldText = styled.span`
  font-weight: 700;
  font-size: 24px;
  line-height: 29px;
  text-align: center;
  color: #243443;
`;

export const ArrowRight = styled.div`
  position: absolute;
  right: 128px;
  bottom: 56px;

  display: flex;
  align-items: center;
  justify-content: center;

  i {
    display: flex;
    align-items: center;
    justify-content: center;

    font-size: 40px;

    color: #243443;
  }
`;

export const FloatingButton = styled.button`
  position: absolute;
  right: 32px;
  bottom: 32px;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 64px;
  height: 64px;
  border-radius: 50%;

  background: #377dff;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);

  border: none;

  &:hover {
    background: ${shade(0.2, '#377dff')};
  }

  i {
    display: flex;
    align-items: center;
    justify-content: center;

    font-size: 32px;

    color: #fff;
  }
`;

export const ChatList = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;

  width: 100%;

  margin-bottom: 16px;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const ChatContainer = styled(Link)`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;

  text-decoration: none;

  width: 100%;

  border-bottom: 1px solid #e5e5e5;

  padding: 12px 24px;

  &:hover {
    transform: translateX(10px);
  }

  img {
    width: 48px;
    height: 48px;
    border-radius: 50%;
  }

  .name-last-message {
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: center;

    margin-left: 12px;
    margin-right: auto;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    span {
      font-weight: 600;
      font-size: 16px;
      line-height: 19px;
      color: #243443;

      margin-bottom: 4px;
    }

    p {
      font-weight: 400;
      font-size: 14px;
      line-height: 17px;
      color: #58616a;
    }
  }

  .time-last-message-new-message {
    display: flex;
    flex-direction: column;
    align-items: center;

    max-width: 84px;
    height: 100%;

    margin-left: 8px;

    span {
      max-width: 100%;

      display: block;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;

      font-weight: 500;
      font-size: 12px;
      line-height: 15px;
      text-align: center;
      color: #58616a;

      margin-top: 4px;
    }

    .new-message {
      display: flex;
      align-items: center;
      justify-content: center;

      width: 22px;
      height: 22px;
      border-radius: 50%;

      margin-top: 6px;

      background: #377dff;

      font-weight: 600;
      font-size: 14px;
      line-height: 17px;
      color: #ffffff;
    }
  }

  i {
    font-size: 24px;
    color: #243443;
  }
`;
