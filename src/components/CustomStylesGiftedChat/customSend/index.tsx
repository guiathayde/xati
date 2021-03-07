import React from 'react';
import { Send } from 'react-native-gifted-chat';
import { styles } from './styles';
import { SendIcon } from './styles';

const customSend = (props: any) => {
  return (
    <Send {...props} alwaysShowSend containerStyle={styles.container}>
      <SendIcon source={require('../../../assets/send-icon.png')} />
    </Send>
  );
};

export default customSend;
