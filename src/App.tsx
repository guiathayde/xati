import { BrowserRouter } from 'react-router-dom';

import { AppProvider } from './hooks';

import { InjectAxiosInterceptors } from './pages/InjectAxiosInterceptors';
import { PromptInstallPWA } from './pages/PromptInstallPWA';
import { ToastyUpdateServiceWorker } from './pages/ToastyUpdateServiceWorker';
import { ToastyNewMessage } from './pages/ToastyNewMessage';

import { Routes } from './routes';

import { GlobalStyle } from './styles/global';

export function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <InjectAxiosInterceptors />
        <PromptInstallPWA />
        <ToastyUpdateServiceWorker />
        <ToastyNewMessage />

        <Routes />
      </AppProvider>

      <GlobalStyle />
    </BrowserRouter>
  );
}
