import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RecaptchaVerifier } from 'firebase/auth';
import { PhoneNumberUtil } from 'google-libphonenumber';

import { useAuth } from '../../hooks/auth';

import { Container } from '../../components/Container';
import { SignInWithPhone } from './components/SignInWithPhone';
import { EnterPhoneNumber } from './components/EnterPhoneNumber';
import { EnterCode } from './components/EnterCode';
import { LoadingModal } from '../../components/LoadingModal';

export function SignIn() {
  const { auth, signInWithPhoneNumber, signInCodeConfirmation } = useAuth();
  const navigate = useNavigate();

  const [signInWithPhone, setSignInWithPhone] = useState(true);
  const [enterPhoneNumber, setEnterPhoneNumber] = useState(false);
  const [enterCode, setEnterCode] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const [appVerifier, setAppVerifier] = useState<RecaptchaVerifier>();
  const [phoneNumber, setPhoneNumber] = useState<string>();
  const [code, setCode] = useState<string>();

  const signInWithPhoneOnClick = useCallback(() => {
    setSignInWithPhone(false);
    setEnterPhoneNumber(true);
    setEnterCode(false);
  }, []);

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
    setIsLoading(true);

    if (!appVerifier) {
      alert('Please allow reCAPTCHA');
      return;
    }
    if (!phoneNumber || phoneNumber === '') {
      alert('Please enter a phone number');
      return;
    }

    const phoneNumberUtil = PhoneNumberUtil.getInstance();
    const phoneNumberInstance = phoneNumberUtil.parse(phoneNumber);
    const isValid = phoneNumberUtil.isValidNumberForRegion(
      phoneNumberInstance,
      'BR',
    );
    if (!isValid) {
      alert('Please enter a valid phone number');
      return;
    }

    const success = await signInWithPhoneNumber(appVerifier, phoneNumber);

    if (success) {
      setSignInWithPhone(false);
      setEnterPhoneNumber(false);
      setEnterCode(true);
    } else {
      alert('Please enter a valid phone number');
    }

    setIsLoading(false);
  }, [signInWithPhoneNumber, appVerifier, phoneNumber]);

  const onSendCode = useCallback(async () => {
    setIsLoading(true);

    const result = await signInCodeConfirmation(code);

    if (result !== 'error') {
      setIsLoading(false);
      navigate(`/${result}`);
    } else {
      setIsLoading(false);
      alert('Please enter a valid code');
    }
  }, [code, navigate, signInCodeConfirmation]);

  useEffect(() => {
    const reCaptchaVerifier = new RecaptchaVerifier(
      'sign-in-button',
      { size: 'invisible' },
      auth,
    );
    reCaptchaVerifier.verify();

    setAppVerifier(reCaptchaVerifier);

    return () => {
      reCaptchaVerifier.clear();
    };
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

      <LoadingModal isOpen={isLoading} setIsOpen={setIsLoading} />
    </Container>
  );
}
