import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { useTheme } from '../../hooks/theme';

import { CircularButton } from '../CircularButton';

import { Container, HeaderTitle, HeaderImage } from './styles';

interface HeaderProps {
  containerStyle?: StyleProp<ViewStyle>;
  title?: string;
  translateXTitle?: number;
  imageUrl?: string;
}

export const Header: React.FC<HeaderProps> = ({
  containerStyle,
  title,
  translateXTitle = 0,
  imageUrl,
}) => {
  const { colors } = useTheme();
  const navigation = useNavigation();

  return (
    <Container style={containerStyle}>
      <CircularButton
        containerStyle={{ marginLeft: 16 }}
        backgroundColor={colors.backButtonBackground}
        size={40}
        iconWidth={18.67}
        iconHeight={16}
        iconSource={require('../../assets/components/ic_back.png')}
        onPress={() => navigation.goBack()}
      />

      <HeaderTitle
        style={{ transform: [{ translateX: translateXTitle }] }}
        color={colors.descriptionFont}
      >
        {title}
      </HeaderTitle>

      {imageUrl && <HeaderImage source={{ uri: imageUrl }} />}
    </Container>
  );
};
