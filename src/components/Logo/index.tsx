import React from 'react';
import { StyleProp, Text, View, ViewProps, ViewStyle } from 'react-native';

import { styles } from './styles';

interface LogoProps extends ViewProps {
  containerStyle?: StyleProp<ViewStyle>;
}

export const Logo: React.FC<LogoProps> = ({
  containerStyle = {} as object,
  ...props
}) => {
  return (
    <View style={{ ...styles.logo, ...containerStyle }} {...props}>
      <Text style={styles.logoText}>Xati</Text>
      <Text style={styles.logoDot}>.</Text>
    </View>
  );
};
