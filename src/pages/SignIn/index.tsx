import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { isValidPhoneNumber } from 'react-phone-number-input';
import {
  getAuth,
  RecaptchaVerifier,
  useDeviceLanguage,
  signInWithPhoneNumber,
  ConfirmationResult,
} from 'firebase/auth';

import { firebase } from '../../services/firebase';

import { Container } from '../../components/Container';
import { SignInWithPhone } from './components/SignInWithPhone';
import { EnterPhoneNumber } from './components/EnterPhoneNumber';
import { EnterCode } from './components/EnterCode';

export function SignIn() {
  const navigate = useNavigate();

  const [signInWithPhone, setSignInWithPhone] = useState(true);
  const [enterPhoneNumber, setEnterPhoneNumber] = useState(false);
  const [enterCode, setEnterCode] = useState(false);

  const [appVerifier, setAppVerifier] = useState<RecaptchaVerifier>();
  const [confirmationResult, setConfirmationResult] =
    useState<ConfirmationResult>();

  const [phoneNumber, setPhoneNumber] = useState<string>();
  const [code, setCode] = useState<string>();

  const auth = getAuth(firebase);
  useDeviceLanguage(auth);

  const signInWithPhoneOnClick = useCallback(() => {
    if (appVerifier) {
      setSignInWithPhone(false);
      setEnterPhoneNumber(true);
      setEnterCode(false);
    } else {
      alert('Please allow the reCAPTCHA');
    }
  }, [appVerifier]);

  const enterPhoneNumberOnClickBack = useCallback(() => {
    setSignInWithPhone(true);
    setEnterPhoneNumber(false);
    setEnterCode(false);
  }, []);

  const enterCodeOnClickBack = useCallback(() => {
    setSignInWithPhone(false);
    setEnterPhoneNumber(true);
    setEnterCode(false);
  }, []);

  const onSendPhoneNumber = useCallback(async () => {
    if (!appVerifier) {
      alert('Please allow the reCAPTCHA');
      return;
    }
    if (!phoneNumber || phoneNumber === '') {
      alert('Please enter a phone number');
      return;
    }
    if (!isValidPhoneNumber(phoneNumber)) {
      alert('Please enter a valid phone number');
      return;
    }

    try {
      const confirmationResultUpdated = await signInWithPhoneNumber(
        auth,
        phoneNumber,
        appVerifier,
      );

      setConfirmationResult(confirmationResultUpdated);

      setSignInWithPhone(false);
      setEnterCode(true);
      setEnterPhoneNumber(false);
    } catch (error) {
      console.error(error);
    }
  }, [appVerifier, auth, phoneNumber]);

  const onSendCode = useCallback(async () => {
    if (!confirmationResult) {
      alert('Please enter a phone number');
      return;
    }
    if (!code || code === '') {
      alert('Please enter the code sent to your phone');
      return;
    }

    try {
      const result = await confirmationResult.confirm(code);

      if (result.user.uid) navigate('/dashboard');
    } catch (error) {
      console.error(error);
    }
  }, [code, confirmationResult, navigate]);

  useEffect(() => {
    const reCaptchaVerifier = new RecaptchaVerifier(
      'sign-in-button',
      { size: 'invisible' },
      auth,
    );
    reCaptchaVerifier.render();
    setAppVerifier(reCaptchaVerifier);
  }, [auth]);

  return (
    <Container>
      {signInWithPhone && <SignInWithPhone onClick={signInWithPhoneOnClick} />}

      {enterPhoneNumber && (
        <EnterPhoneNumber
          onClickBack={enterPhoneNumberOnClickBack}
          setPhoneNumber={setPhoneNumber}
          onSendPhoneNumber={onSendPhoneNumber}
        />
      )}

      {enterCode && (
        <EnterCode
          onClickBack={enterCodeOnClickBack}
          code={code}
          setCode={setCode}
          onSendCode={onSendCode}
        />
      )}
    </Container>
  );
}
