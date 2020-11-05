import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';

import Menu from './menu';
import TitleBar from './titleBar';

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

export default function Layout({children, pageName}) {

    const classes = useStyles();
    const [open, setOpen] = useState(true);
    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };
    
    return (
        <div className={classes.root}>
        <TitleBar 
            open={open} 
            handleDrawerOpen={handleDrawerOpen} 
            pageName={pageName}
        />
        <Menu 
            open={open} 
            handleDrawerClose={handleDrawerClose}
        />
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                {children}
            </main>
        </div>
    );

}