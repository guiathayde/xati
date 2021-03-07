import React from 'react';
import { Composer, ComposerProps } from 'react-native-gifted-chat';
import { styles } from './styles';

const customtInputToolbar = (props: ComposerProps) => {
  return (
    <Composer
      {...props}
      placeholderTextColor="#AAB0B7"
      placeholder="Digite sua mensagem"
      textInputStyle={styles.textInput}
    />
  );
};

export default customtInputToolbar;
