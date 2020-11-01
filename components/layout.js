import Navbar from './navbar'
import { makeStyles } from '@material-ui/core/styles';

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

export default function Layout({
    children, 
    pageName,
}) {
    
    const classes = useStyles();

    return (
        <div className={classes.root}>
        
        <Navbar pageName={pageName}/>
        <main>{children}</main>
        <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        {children}
        </main>
        
        </div>
    );

}