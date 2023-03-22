import { Styles as ModalStyles } from 'react-modal';
import styled from 'styled-components';
import { lighten } from 'polished';

export const modalStyles: ModalStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    maxHeight: '100%',
    display: 'flex',
  },
  content: {
    position: 'initial',
    width: '100%',
    maxWidth: 425,
    backgroundColor: '#F7F7F9',
    margin: 'auto',
    marginBottom: 0,
    padding: 24,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.5)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    animationName: 'animatebottom',
    animationDuration: '0.5s',
  },
};

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;

  padding: 0 8px;

  span {
    font-weight: 600;
    font-size: 20px;
    line-height: 24px;
    text-align: center;
    color: #243443;
  }

  button {
    display: flex;
    align-items: center;
    justify-content: center;

    padding: 8px 16px;

    background: transparent;
    border: none;
    border-radius: 8px;

    font-weight: 500;
    font-size: 20px;
    line-height: 24px;
    text-align: center;
    color: #377dff;

    transition: background-color 0.2s;

    &:hover {
      background-color: ${lighten(0.2, '#FF4D4F')};
    }
  }
`;

export const Body = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100%;

  margin: 4px 0 16px;
  padding: 16px 24px;

  border-top: 1px solid #e6e6f0;
  border-bottom: 1px solid #e6e6f0;

  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
  text-align: center;
  color: #243443;
`;

export const IOSPrompt = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100%;

  margin: 4px 0 16px;

  & > div {
    display: flex;
    align-items: center;

    width: 100%;

    padding: 0px 16px;

    font-weight: 400;
    font-size: 16px;
    line-height: 20px;
    text-align: center;
    color: #243443;

    span {
      margin-left: 16px;
    }

    .share {
      color: #377dff;
    }

    .add {
      color: #243443;
    }
  }
`;
