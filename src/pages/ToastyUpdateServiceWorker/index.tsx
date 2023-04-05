import { useServiceWorker } from '../../hooks/serviceWorker';

import { ToastyContainer } from '../../components/ToastyContainer';

import { InfoContainer } from './styles';

export function ToastyUpdateServiceWorker() {
  const { waitingWorker, showReload, reloadPage } = useServiceWorker();

  return showReload && waitingWorker ? (
    <ToastyContainer
      content={
        <InfoContainer>
          <strong>A new version of Xati. is available</strong>
        </InfoContainer>
      }
      confirmButton={{
        label: 'Refresh',
        onClick: reloadPage,
      }}
      cancelButton={{
        label: 'Cancel',
        onClick: () => {},
      }}
      toastOptions={{ duration: 10000 }}
    />
  ) : null;
}
