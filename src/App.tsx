import { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { PromptInstallPWA } from './pages/PromptInstallPWA';

import { Routes } from './routes';

import { AppProvider } from './hooks';

import { GlobalStyle } from './styles/global';

export function App() {
  useEffect(() => {
    if (screen.orientation)
      screen.orientation
        .lock('portrait')
        .then(() => console.log('Portrait mode locked'))
        .catch(error => console.error(error));
  }, []);

  return (
    <BrowserRouter>
      <AppProvider>
        <PromptInstallPWA />

        <Routes />
      </AppProvider>

      <GlobalStyle />
    </BrowserRouter>
  );
}
