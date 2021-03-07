import React, { useCallback, useEffect } from 'react';

import { useAuth } from '../../hooks/auth';

import {
  Container,
  LogoImage,
  Button,
  ButtonText,
  CheckImage,
  SuccessText,
} from './styles';

import logoImg from '../../assets/logo-white.png';
import apiFirebase from '../../database/apiFirebase';

const RegisterSuccess: React.FC = () => {
  const { signUpUpdate } = useAuth();

  useEffect(() => {
    apiFirebase.getMessagingToken().then(async response => {
      await apiFirebase.saveMessagingTokenStorage(response);
      apiFirebase.saveDeviceDatabase(response).then(() => {
        console.log(
          'Token gerado, salvado no banco de dados e no AsyncStorage',
        );
      });
    });
  }, []);

  const handleOkPressed = useCallback(() => {
    signUpUpdate();
  }, [signUpUpdate]);

  return (
    <>
      <Container>
        <LogoImage source={logoImg} />

        <CheckImage source={require('../../assets/check-icon.png')} />

        <SuccessText>Cadastro feito com sucesso</SuccessText>

        <Button onPress={handleOkPressed}>
          <ButtonText>Ok</ButtonText>
        </Button>
      </Container>
    </>
  );
};

export default RegisterSuccess;
