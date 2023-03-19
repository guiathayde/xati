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

  overflow-y: auto;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const Message = styled.div<MessageProps>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  align-self: ${({ isOwn }) => (isOwn ? 'flex-end' : 'flex-start')};

  max-width: 65%;

  margin: 4px 0;
  padding: 8px 16px;

  border-radius: 8px;

  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
  color: ${({ isOwn }) => (isOwn ? '#FFFFFF' : '#243443')};

  background-color: ${({ isOwn }) => (isOwn ? '#377DFF' : '#FFFFFF')};
`;
