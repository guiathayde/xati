import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';

import { useTheme } from '../../../hooks/theme';

import { Container, ButtonText } from './styles';

interface RectangularButtonProps {
  containerStyle?: StyleProp<ViewStyle>;
  color: 'blue' | 'red';
  text: string;
  onPress?: () => void;
}

export const RectangularButton: React.FC<RectangularButtonProps> = ({
  containerStyle,
  color,
  text,
  onPress,
}) => {
  const { colors } = useTheme();

  return (
    <Container
      style={containerStyle}
      backgroundColor={
        color === 'blue'
          ? colors.defaultButtonBackground
          : colors.logoutButtonBackground
      }
      onPress={onPress}
    >
      <ButtonText>{text}</ButtonText>
    </Container>
  );
};
