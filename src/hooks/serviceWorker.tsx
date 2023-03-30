import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

import * as serviceWorkerRegistration from '../serviceWorkerRegistration';

interface ServiceWorkerContextData {
  showReload: boolean;
  waitingWorker: ServiceWorker | null;
  reloadPage: () => void;
}

interface ServiceWorkerProviderProps {
  children: React.ReactNode;
}

const ServiceWorkerContext = createContext<ServiceWorkerContextData>(
  {} as ServiceWorkerContextData,
);

export function ServiceWorkerProvider({
  children,
}: ServiceWorkerProviderProps) {
  const [waitingWorker, setWaitingWorker] = useState<ServiceWorker | null>(
    null,
  );
  const [showReload, setShowReload] = useState(false);

  // called when a service worker
  // updates. this function is a callback
  // to the actual service worker
  // registration onUpdate.
  const onSWUpdate = useCallback((registration: ServiceWorkerRegistration) => {
    setShowReload(true);
    setWaitingWorker(registration.waiting);
  }, []);

  // simply put, this tells the service
  // worker to skip the waiting phase and then reloads the page
  const reloadPage = useCallback(() => {
    waitingWorker?.postMessage({ type: 'SKIP_WAITING' });
    setShowReload(false);
    window.location.reload();
  }, [waitingWorker]);

  // register the service worker
  useEffect(() => {
    // If you want your app to work offline and load faster, you can change
    // unregister() to register() below. Note this comes with some pitfalls.
    // Learn more about service workers: https://cra.link/PWA
    serviceWorkerRegistration.register({
      onUpdate: onSWUpdate,
    });
  }, [onSWUpdate]);

  return (
    <ServiceWorkerContext.Provider
      value={{ showReload, waitingWorker, reloadPage }}
    >
      {children}
    </ServiceWorkerContext.Provider>
  );
}

export function useServiceWorker() {
  const context = useContext(ServiceWorkerContext);

  if (!context) {
    throw new Error(
      'useServiceWorker must be used within an ServiceWorkerProvider',
    );
  }

  return context;
}
