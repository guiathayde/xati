import styled from 'styled-components';

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

export const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  width: 104px;
  height: 100%;

  background-color: transparent;
`;

export const ConfirmButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 50%;

  background-color: transparent;

  border: none;
  border-left: 1px solid #e6ecf0;

  border-top-right-radius: 8px;

  font-size: 14px;
  color: #377dff;
`;

export const CancelButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 50%;

  background-color: transparent;

  border: none;
  border-top: 1px solid #e6ecf0;
  border-left: 1px solid #e6ecf0;

  border-bottom-right-radius: 8px;

  font-size: 14px;
  color: #ff4d4f;
`;
