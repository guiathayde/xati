import { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { InjectAxiosInterceptors } from './pages/InjectAxiosInterceptors';
import { PromptInstallPWA } from './pages/PromptInstallPWA';

import { Routes } from './routes';

import { AppProvider } from './hooks';

import { GlobalStyle } from './styles/global';

export function App() {
  useEffect(() => {
    if (screen.orientation.lock)
      screen.orientation
        .lock('portrait')
        .then(() => console.log('Portrait mode locked'))
        .catch(error => console.error(error));
  }, []);

  return (
    <BrowserRouter>
      <AppProvider>
        <InjectAxiosInterceptors />
        <PromptInstallPWA />

        <Routes />
      </AppProvider>

      <GlobalStyle />
    </BrowserRouter>
  );
}
