import React from 'react';
import { RecoilRoot } from 'recoil';

import { GlobalStyle } from '../components/GlobalStyle';

function MyApp({ Component, pageProps }) {
  return (
    <React.Fragment>
      <GlobalStyle />
      <RecoilRoot>
        <Component {...pageProps} />
      </RecoilRoot>
      <div id="portal" />
    </React.Fragment>
  );
}

export default MyApp;
