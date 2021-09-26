import 'react-toastify/dist/ReactToastify.css';

import React from 'react';
import { ToastContainer } from 'react-toastify';
import { RecoilRoot } from 'recoil';

import { GlobalStyle } from '../components/GlobalStyle';

function MyApp({ Component, pageProps }) {
  return (
    <React.Fragment>
      <GlobalStyle />
      <RecoilRoot>
        <Component {...pageProps} />
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </RecoilRoot>
      <div id="portal" />
    </React.Fragment>
  );
}

export default MyApp;
