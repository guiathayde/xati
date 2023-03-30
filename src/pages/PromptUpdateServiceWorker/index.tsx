import { useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';

import { useServiceWorker } from '../../hooks/serviceWorker';

import {
  Container,
  InfoContainer,
  ButtonsContainer,
  RefreshButton,
  CancelButton,
} from './styles';

export function PromptUpdateServiceWorker() {
  const { waitingWorker, showReload, reloadPage } = useServiceWorker();

  useEffect(() => {
    if (showReload && waitingWorker) {
      toast.custom(t => (
        <Container className={t.visible ? 'animate-enter' : 'animate-leave'}>
          <InfoContainer>
            <strong>A new version of Xati. is available</strong>
          </InfoContainer>

          <ButtonsContainer>
            <RefreshButton onClick={() => reloadPage()}>Refresh</RefreshButton>
            <CancelButton
              onClick={() => toast.dismiss(t.id)}
              style={{ color: '#FF4D4F' }}
            >
              Cancel
            </CancelButton>
          </ButtonsContainer>
        </Container>
      ));
    }
  }, [waitingWorker, showReload, reloadPage]);

  return (
    <Toaster
      position="top-center"
      containerStyle={{ marginTop: 16 }}
      toastOptions={{ duration: 10000 }}
    />
  );
}
