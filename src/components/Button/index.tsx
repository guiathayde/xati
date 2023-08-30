import React from 'react';
import {
  TouchableOpacityProps,
  TouchableOpacity,
  ActivityIndicator,
  Text,
  StyleProp,
  ViewStyle,
} from 'react-native';

import { styles } from './styles';

interface ButtonProps extends TouchableOpacityProps {
  containerStyle?: StyleProp<ViewStyle>;

  title: string;
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  containerStyle = {} as object,
  title,
  isLoading = false,
  ...props
}) => {
  return (
    <TouchableOpacity
      style={{ ...styles.container, ...containerStyle }}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? (
        <ActivityIndicator size="small" color="white" />
      ) : (
        <Text style={styles.title}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};
