import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;
  }

  body {
    position: absolute;
    display: flex;

    width: 100vw;
    height: 100%;

    background: #808080;

    color: #243443;
    -webkit-font-smoothing: antialiased;

    #root {
      display: flex;
      flex: 1;
      align-items: center;
      justify-content: center;
    }
  }

  body, input, textarea, button {
    font-family: 'Inter', sans-serif;
    font-size: 16px;
  }

  h1, h2, h3, h4, h5, h6, strong {
    font-weight: 700;
  }

  button {
    cursor: pointer;
  }
`;
