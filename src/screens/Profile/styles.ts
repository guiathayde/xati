import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';

interface ContainerProps {
  backgroundColor: string;
}

export const Container = styled.View<ContainerProps>`
  flex: 1;
  align-items: center;
  background-color: ${props => props.backgroundColor};
`;

export const ContentContainer = styled.ScrollView`
  flex: 1;
  width: 100%;
`;

export const PhotoContainer = styled.View`
  position: relative;

  width: 190px;
  height: 190px;

  margin-top: 32px;
`;

export const PhotoImage = styled.Image`
  width: 190px;
  height: 190px;

  border-radius: 95px;
`;

export const styles = StyleSheet.create({
  edit: {
    position: 'absolute',
    bottom: 0,
    right: 5,
  },
});
