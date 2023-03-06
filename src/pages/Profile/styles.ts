import styled from 'styled-components';
import { shade } from 'polished';
import { Styles as ModalStyles } from 'react-modal';

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

export const PhotoContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  margin-top: 32px;

  width: 190px;
  height: 190px;
  border-radius: 50%;
`;

export const Photo = styled.img`
  width: 190px;
  height: 190px;
  border-radius: 50%;

  object-fit: cover;
`;

export const PhotoEditContainer = styled.label`
  position: absolute;
  bottom: 0;
  right: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 50px;
  height: 50px;
  border: none;
  border-radius: 50%;

  background: #377dff;

  cursor: pointer;

  transition: background-color 0.2s;

  &:hover {
    background: ${shade(0.2, '#377dff')};
  }

  img {
    width: 24px;
    height: 24px;
  }

  input[type='file'] {
    display: none;
  }
`;

export const selectPhotoModal: ModalStyles = {
  overlay: {
    maxWidth: 425,
    height: '95%',
    left: '50%',
    top: '50%',
    transform: 'translateX(-50%) translateY(-50%)',
    backgroundColor: 'transparent',
  },
  content: {
    display: 'flex',
    justifyContent: 'center',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    maxWidth: 425,
    maxHeight: '100%',
    borderRadius: 12,
  },
};
