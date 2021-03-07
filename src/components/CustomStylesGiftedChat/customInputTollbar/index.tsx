import React from 'react';
import { InputToolbar, InputToolbarProps } from 'react-native-gifted-chat';
import { styles } from './styles';

const customtInputToolbar = (props: InputToolbarProps) => {
  return <InputToolbar {...props} containerStyle={styles.container} />;
};

export default customtInputToolbar;
