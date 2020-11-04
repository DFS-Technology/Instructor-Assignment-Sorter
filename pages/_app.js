import React, {useState} from 'react';
import initFirebase from '../lib/init-firebase';
import {getInitialData} from '../lib/firestore-api';
import PropTypes from 'prop-types';

import Head from 'next/head';
import CssBaseline from '@material-ui/core/CssBaseline';

import { ThemeProvider } from '@material-ui/core/styles';
import theme from '../styles/theme';
// fixes a bug.
import '../styles/new.css'

export default function MyApp({ Component, pageProps }) {
  
  
  initFirebase();
  
  const [tempSeasonList, tempCurrentSeason] = getInitialData();
  const [seasonList, setSeasonList] = useState(tempSeasonList);
  
  const tempCurrentSeason1 = seasonList[0];
  console.log(seasonList,tempSeasonList[0],seasonList[0],tempCurrentSeason1);
  const [currentSeason, setCurrentSeason] = useState(tempCurrentSeason);
  
  
  
  const userPackage = {
    seasons: seasonList,
    setSeasons: setSeasonList,
    curSeason: currentSeason,
    setCurSeason: setCurrentSeason,
  }
  console.log(userPackage.seasons,userPackage.curSeason);

  
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
          <Component { ...pageProps} userPackage={userPackage}/>
      </ThemeProvider>
    </React.Fragment>
  );
}
MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};