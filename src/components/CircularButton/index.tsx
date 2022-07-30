import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';

import { Container, Icon } from './styles';

interface CircularButtonProps {
  containerStyle?: StyleProp<ViewStyle>;
  hasElevation?: boolean;
  backgroundColor: string;
  size: number;
  iconSource: any;
  iconWidth: number;
  iconHeight: number;
  onPress?: () => void;
}

export const CircularButton: React.FC<CircularButtonProps> = ({
  containerStyle,
  hasElevation = false,
  backgroundColor,
  size,
  iconSource,
  iconWidth,
  iconHeight,
  onPress,
}) => {
  return (
    <Container
      style={containerStyle}
      hasElevation={hasElevation}
      size={size}
      backgroundColor={backgroundColor}
      onPress={onPress}
    >
      <Icon width={iconWidth} height={iconHeight} source={iconSource} />
    </Container>
  );
};
