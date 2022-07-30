import React from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { useHeaderHeight } from '@react-navigation/elements';

import { useTheme } from '../../hooks/theme';

import { Header } from '../../components/Header';
import { CircularButton } from '../../components/CircularButton';
import { Input } from '../../components/Input';
import { RectangularButton } from './RectangularButton';

import {
  Container,
  ContentContainer,
  PhotoContainer,
  PhotoImage,
  styles,
} from './styles';

import ContentCopyIcon from '../../assets/profile/ic_content_copy.png';

export const Profile = () => {
  const { colors } = useTheme();
  const headerHeight = useHeaderHeight();

  return (
    <Container backgroundColor={colors.appBackground}>
      <Header title="Profile" translateXTitle={-25} />

      <KeyboardAvoidingView
        keyboardVerticalOffset={headerHeight}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1, width: '100%' }}
      >
        <ContentContainer
          contentContainerStyle={{ alignItems: 'center' }}
          showsVerticalScrollIndicator={false}
        >
          <PhotoContainer>
            <PhotoImage
              source={{
                uri: 'https://source.unsplash.com/XAo09LtQiAQ/300x300',
              }}
            />
            <CircularButton
              containerStyle={styles.edit}
              backgroundColor={colors.defaultButtonBackground}
              size={50}
              iconWidth={24}
              iconHeight={24}
              iconSource={require('../../assets/profile/ic_edit.png')}
            />
          </PhotoContainer>

          <Input containerStyle={{ width: '80%', marginTop: 32 }} />

          <RectangularButton
            containerStyle={{ width: '80%', marginTop: 24 }}
            color="blue"
            text="Save"
          />

          <Input
            containerStyle={{ width: '80%', marginTop: 32 }}
            iconSource={ContentCopyIcon}
          />

          <RectangularButton
            containerStyle={{ width: '80%', marginTop: 24 }}
            color="red"
            text="Logout"
          />
        </ContentContainer>
      </KeyboardAvoidingView>
    </Container>
  );
};
