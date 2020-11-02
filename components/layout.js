import Navbar from './navbar/navbar'
import { makeStyles } from '@material-ui/core/styles';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

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

export default function Layout({children, pageName}) {
    
    const classes = useStyles();

    

    return (
        <div className={classes.root}>
        <Navbar pageName={pageName}/>
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                {children}
            </main>
        
        </div>
    );

}