import { useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';

import { useFirebase } from '../../hooks/firebase';

import {
  Container,
  InfoContainer,
  ProfileImage,
  NameMessageContainer,
  ButtonsContainer,
  Button,
} from './styles';

export function PromptNewMessage() {
  const { getFirebaseCloudMessagingToken, foregroundNotification } =
    useFirebase();

  useEffect(() => {
    getFirebaseCloudMessagingToken()
      .then(firebaseToken => {
        console.log('Firebase token: ', firebaseToken);
      })
      .catch(err =>
        console.error(
          'An error occured while retrieving Firebase Cloud Messaging token. ',
          err,
        ),
      );
  }, [getFirebaseCloudMessagingToken]);

  useEffect(() => {
    if (foregroundNotification) {
      toast.custom(t => (
        <Container className={t.visible ? 'animate-enter' : 'animate-leave'}>
          <InfoContainer>
            <ProfileImage
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixqx=6GHAjsWpt9&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80"
              alt="Emilia Gates"
            />
            <NameMessageContainer>
              <strong>{foregroundNotification.title}</strong>
              <span>{foregroundNotification.body}</span>
            </NameMessageContainer>
          </InfoContainer>

          <ButtonsContainer>
            <Button>Open</Button>
            <Button
              onClick={() => toast.dismiss(t.id)}
              style={{ color: '#FF4D4F' }}
            >
              Close
            </Button>
          </ButtonsContainer>
        </Container>
      ));
    }
  }, [foregroundNotification]);

  return <Toaster position="top-center" containerStyle={{ marginTop: 16 }} />;
}
