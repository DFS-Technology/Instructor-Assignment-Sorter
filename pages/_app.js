import Head from 'next/head';
import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../styles/theme';
import { ThemeProvider } from '@material-ui/core/styles';
// import db from '../lib/firebase-lib';

export default function MyApp({ Component, pageProps }) {
  
  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);
  
  return (
    <React.Fragment>
      <Head>
        <title>Instructor Assignment Sorter</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <link rel="icon" href="/dfslogo.svg" />
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Rubik&display=swap');
        </style>
      </Head>
      
      <ThemeProvider theme={theme}>
      <CssBaseline/>
          <Component {...pageProps} />
      </ThemeProvider>
    </React.Fragment>

  );
}

// MyApp.getInitialProps = async (ctx) => {
//   return {}
// }
