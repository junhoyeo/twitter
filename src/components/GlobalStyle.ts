import dedent from 'dedent';
import { createGlobalStyle, css } from 'styled-components';
import normalize from 'styled-normalize';

const systemFontStack = dedent`
  TwitterChirp, "Inter", -apple-system,
  BlinkMacSystemFont, "Segoe UI",
  Roboto, Helvetica, Arial, sans-serif;
`;

const fonts = css`
  @font-face {
    font-family: TwitterChirpExtendedHeavy;
    src: url('https://abs.twimg.com/fonts/v1/chirp-extended-heavy-web.woff2')
      format('woff2');
    src: url('https://abs.twimg.com/fonts/v1/chirp-extended-heavy-web.woff')
      format('woff');
    font-weight: 800;
    font-style: 'normal';
    font-display: 'swap';
  }
  @font-face {
    font-family: TwitterChirp;
    src: url('https://abs.twimg.com/fonts/v2/chirp-regular-web.woff2')
      format('woff2');
    src: url('https://abs.twimg.com/fonts/v2/chirp-regular-web.woff')
      format('woff');
    font-weight: 400;
    font-style: 'normal';
    font-display: 'swap';
  }
  @font-face {
    font-family: TwitterChirp;
    src: url('https://abs.twimg.com/fonts/v2/chirp-medium-web.woff2')
      format('woff2');
    src: url('https://abs.twimg.com/fonts/v2/chirp-medium-web.woff')
      format('woff');
    font-weight: 500;
    font-style: 'normal';
    font-display: 'swap';
  }
  @font-face {
    font-family: TwitterChirp;
    src: url('https://abs.twimg.com/fonts/v2/chirp-bold-web.woff2')
      format('woff2');
    src: url('https://abs.twimg.com/fonts/v2/chirp-bold-web.woff')
      format('woff');
    font-weight: 700;
    font-style: 'normal';
    font-display: 'swap';
  }
  @font-face {
    font-family: TwitterChirp;
    src: url('https://abs.twimg.com/fonts/v2/chirp-heavy-web.woff2')
      format('woff2');
    src: url('https://abs.twimg.com/fonts/v2/chirp-heavy-web.woff')
      format('woff');
    font-weight: 800;
    font-style: 'normal';
    font-display: 'swap';
  }
`;

export const GlobalStyle = createGlobalStyle`
  ${normalize}
  ${fonts}

  * {
    box-sizing: border-box;
    word-break: keep-all;
    outline-style: none;
    user-select: none;
  }

  body {
    margin: 0;
    font-family: ${systemFontStack};
    background-color: black;
    color: rgb(217, 217, 217);
  }

  a {
    text-decoration: none;
    cursor: pointer;
  }

  input {
    outline: 0;
  }

  button {
    border: 0;
    outline: 0;
    background-color: transparent;
    cursor: pointer;
  }

  .Toastify__toast.Toastify__toast-theme--light.Toastify__toast--default {
    min-height: unset;
    padding: 16px;
    background-color: rgb(29, 155, 240);
  }

  .Toastify__toast-body {
    margin: 0;
    padding: 0;
    font-weight: 700;
    font-size: 17px;
    line-height: 20px;
    color: rgb(255, 255, 255);
  }
`;
