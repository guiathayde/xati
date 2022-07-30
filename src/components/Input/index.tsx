import React from 'react';
import { StyleProp, ViewStyle, TextInputProps } from 'react-native';

import { useTheme } from '../../hooks/theme';

import { Container, TextInput, IconInputContainer, IconInput } from './styles';

interface InputProps extends TextInputProps {
  containerStyle?: StyleProp<ViewStyle>;

  iconSource?: any;
  iconCallback?: () => void;
}

export const Input: React.FC<InputProps> = ({
  containerStyle,
  iconSource,
  iconCallback,
  ...rest
}) => {
  const { colors } = useTheme();

  return (
    <Container style={containerStyle} backgroundColor={colors.inputBackground}>
      <TextInput {...rest} />
      {iconSource && (
        <IconInputContainer onPress={iconCallback}>
          <IconInput source={iconSource} />
        </IconInputContainer>
      )}
    </Container>
  );
};
