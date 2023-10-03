import React, { forwardRef } from 'react';
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

export const Input = forwardRef<TextInput, InputProps>(
  (
    {
      containerStyle = {} as object,
      inputStyle = {} as object,
      iconSource,
      iconCallback,
      ...props
    },
    ref,
  ) => {
    return (
      <View style={{ ...styles.container, ...containerStyle }}>
        <View style={styles.inputContainer}>
          <TextInput
            ref={ref}
            style={{ ...styles.input, ...inputStyle }}
            placeholderTextColor="#AAB0B7"
            {...props}
          />
        </View>
        {iconSource && (
          <TouchableOpacity style={styles.iconContainer} onPress={iconCallback}>
            <Image style={styles.iconInput} source={iconSource} />
          </TouchableOpacity>
        )}
      </View>
    );
  },
);
