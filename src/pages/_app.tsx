import React from 'react';
import * as firebase from 'firebase/app';

import { GlobalStyle } from '../components/GlobalStyle';
import { firebaseConfig } from '../utils/firebase';

function MyApp({ Component, pageProps }) {
  return (
    <React.Fragment>
      <GlobalStyle />
      <Component {...pageProps} />
    </React.Fragment>
  );
}

export default MyApp;
