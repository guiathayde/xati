import styled from 'styled-components';

interface MessageProps {
  isOwn: boolean;
}

export const Header = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  width: 100%;

  padding: 32px 32px 16px 32px;
`;

export const UserName = styled.h3`
  font-weight: 700;
  font-size: 16px;
  line-height: 19px;
  text-align: center;
  color: #243443;

  margin: 0 auto;
`;

export const UserImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
`;

export const MessageList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  width: 100%;
  height: 100%;

  padding: 0 16px 16px 16px;
  margin-bottom: 4px;

  overflow-y: auto;

  &::-webkit-scrollbar {
    display: none;
  }

  .reduce-margin-top {
    margin-top: 2px;
  }

  .reduce-margin-bottom {
    margin-bottom: 2px;
  }
`;

export const Message = styled.div<MessageProps>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  align-self: ${({ isOwn }) => (isOwn ? 'flex-end' : 'flex-start')};

  max-width: 65%;

  overflow-wrap: anywhere;

  margin: 12px 0;
  padding: 8px 16px;

  border-radius: 8px;

  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
  color: ${({ isOwn }) => (isOwn ? '#FFFFFF' : '#243443')};

  background-color: ${({ isOwn }) => (isOwn ? '#377DFF' : '#FFFFFF')};

  box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
`;

export const Typing = styled.p`
  align-self: flex-start;
  margin: 0 0 4px 24px;
  color: #243443;
`;
