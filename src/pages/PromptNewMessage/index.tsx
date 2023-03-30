import { useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';

import {
  Container,
  InfoContainer,
  ProfileImage,
  NameMessageContainer,
  ButtonsContainer,
  Button,
} from './styles';

export function PromptNewMessage() {
  useEffect(() => {
    toast.custom(t => (
      <Container className={t.visible ? 'animate-enter' : 'animate-leave'}>
        <InfoContainer>
          <ProfileImage
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixqx=6GHAjsWpt9&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80"
            alt="Emilia Gates"
          />
          <NameMessageContainer>
            <strong>Emilia Gates</strong>
            <span>Sure! 8:30pm works great!</span>
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
  }, []);

  return <Toaster position="top-center" containerStyle={{ marginTop: 16 }} />;
}
