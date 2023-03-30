import { BrowserRouter } from 'react-router-dom';

import { AppProvider } from './hooks';

import { InjectAxiosInterceptors } from './pages/InjectAxiosInterceptors';
import { PromptInstallPWA } from './pages/PromptInstallPWA';
import { PromptUpdateServiceWorker } from './pages/PromptUpdateServiceWorker';

import { Routes } from './routes';

import { GlobalStyle } from './styles/global';

export function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <InjectAxiosInterceptors />
        <PromptInstallPWA />
        <PromptUpdateServiceWorker />

        <Routes />
      </AppProvider>

      <GlobalStyle />
    </BrowserRouter>
  );
}
