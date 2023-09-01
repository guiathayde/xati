import React from 'react';
import {
  StyleProp,
  ViewStyle,
  TextInputProps,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  TextStyle,
} from 'react-native';

import { styles } from './styles';

interface InputProps extends TextInputProps {
  containerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;

  iconSource?: any;
  iconCallback?: () => void;
}

export const Input: React.FC<InputProps> = ({
  containerStyle = {} as object,
  inputStyle = {} as object,
  iconSource,
  iconCallback,
  ...props
}) => {
  return (
    <View style={{ ...styles.container, ...containerStyle }}>
      <TextInput
        style={{ ...styles.input, ...inputStyle }}
        placeholderTextColor="#AAB0B7"
        {...props}
      />

      {iconSource && (
        <TouchableOpacity style={styles.iconContainer} onPress={iconCallback}>
          <Image style={styles.iconInput} source={iconSource} />
        </TouchableOpacity>
      )}
    </View>
  );
};
