import Navbar from './navbar/navbar'
import { makeStyles } from '@material-ui/core/styles';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
}));

export default function Layout({children, pageName, userPackage}) {

    const classes = useStyles();

    

    
    
    return (
        <div className={classes.root}>
        <Navbar pageName={pageName} userPackage={userPackage}/>
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                {children}
            </main>
        
        </div>
    );

}