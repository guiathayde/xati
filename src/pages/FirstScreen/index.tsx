import React, { useCallback } from 'react';
import DropShadow from 'react-native-drop-shadow';

import { useNavigation } from '@react-navigation/native';

import {
  Container,
  LogoImage,
  Content,
  Button,
  ButtonText,
  Separator,
  styles,
} from './styles';

import logoImg from '../../assets/logo-white.png';
import separatorImg from '../../assets/separator.png';

const FirstScreen: React.FC = () => {
  const { navigate } = useNavigation();

  const navigateToSignUp = useCallback(() => {
    navigate('SignUp');
  }, [navigate]);

  const navigateToSignIn = useCallback(() => {
    navigate('SignIn');
  }, [navigate]);

  return (
    <>
      <Container>
        <LogoImage source={logoImg} />

        <Content>
          <DropShadow style={styles.dropShadow}>
            <Button onPress={navigateToSignUp}>
              <ButtonText>Cadastrar</ButtonText>
            </Button>
          </DropShadow>

          <Separator source={separatorImg} />

          <DropShadow style={styles.dropShadow}>
            <Button onPress={navigateToSignIn}>
              <ButtonText>Login</ButtonText>
            </Button>
          </DropShadow>
        </Content>
      </Container>
    </>
  );
};

export default FirstScreen;
