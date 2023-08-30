import React from 'react';
import { Image, TouchableOpacity, TouchableOpacityProps } from 'react-native';

import { styles } from './styles';

import BackIcon from '../../assets/components/Back/ic_back.png';

interface BackProps extends TouchableOpacityProps {}

export const Back: React.FC<BackProps> = props => {
  return (
    <TouchableOpacity style={styles.container} {...props}>
      <Image source={BackIcon} />
    </TouchableOpacity>
  );
};
