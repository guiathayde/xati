import styled from 'styled-components';
import { Styles } from 'react-modal';

export const modalDefaultStyles: Styles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  content: {
    inset: 0,
    width: '100%',
    height: '100%',
    maxWidth: 425,
    backgroundColor: 'transparent',
    margin: 'auto',
    border: 'none',
    borderRadius: 12,
    padding: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
};

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;

  padding: 24px;

  border-radius: 12px;

  background-color: white;

  font-weight: 600;
  font-size: 24px;
  line-height: 24px;
  text-align: center;
  color: #243443;
`;
