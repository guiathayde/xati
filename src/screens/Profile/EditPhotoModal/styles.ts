import styled from 'styled-components/native';
import { StyleSheet } from 'react-native';

interface ContainerProps {
  backgroundColor: string;
}

export const Container = styled.View<ContainerProps>`
  flex: 1;
  align-items: center;

  background-color: ${props => props.backgroundColor};

  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.5);
  border-top-left-radius: 40px;
  border-top-right-radius: 40px;
`;

export const HandleModal = styled.View`
  margin-top: 16px;

  width: 64px;
  height: 14px;
  border-radius: 8px;

  background-color: #377dff;
`;

export const SelectTypePhotoText = styled.Text`
  font-family: 'Inter-SemiBold';
  font-size: 20px;
  line-height: 24px;
  text-align: center;

  color: #243443;
`;

export const Divider = styled.View`
  width: 80%;
  height: 1px;
  border-radius: 1px;

  margin-top: 16px;
  margin-bottom: 16px;

  background-color: #243443;
`;

export const styles = StyleSheet.create({
  modalContainer: {
    flex: 0,
    bottom: 0,
    width: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 0,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
});
