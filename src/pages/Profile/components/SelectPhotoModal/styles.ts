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
    border: 'none',
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

export const HandleModal = styled.div`
  width: 54px;
  height: 8px;

  background: #377dff;
  border-radius: 40px;

  margin-bottom: 24px;
`;

export const TextChoice = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;

  font-weight: 600;
  font-size: 20px;
  text-align: center;
  color: #243443;

  width: 80%;
  height: 32px;

  &:hover {
    cursor: pointer;
    color: ${lighten(0.2, '#243443')};
  }

  input[type='file'] {
    display: none;
  }
`;

export const Divider = styled.div`
  width: 250px;
  height: 1px;

  background: #243443;

  margin-top: 12px;
  margin-bottom: 12px;
`;
