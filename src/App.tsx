import { BrowserRouter } from 'react-router-dom';

import { PromptInstallPWA } from './pages/PromptInstallPWA';

import { Routes } from './routes';

import { AppProvider } from './hooks';

import { GlobalStyle } from './styles/global';

export function App() {
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
