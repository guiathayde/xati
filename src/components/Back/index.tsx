import React from 'react';
import {
  Image,
  StyleProp,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from 'react-native';

import { styles } from './styles';

import BackIcon from '../../assets/components/Back/ic_back.png';

interface BackProps extends TouchableOpacityProps {
  containerStyle?: StyleProp<ViewStyle>;
}

export const Back: React.FC<BackProps> = ({
  containerStyle = {} as object,
  ...props
}) => {
  return (
    <TouchableOpacity
      style={{ ...styles.container, ...containerStyle }}
      {...props}
    >
      <Image source={BackIcon} />
    </TouchableOpacity>
  );
};
