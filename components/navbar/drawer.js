import React from 'react';
import clsx from 'clsx';

import Drawer from '@material-ui/core/Drawer';

import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import List from '@material-ui/core/List';
import DrawerItems from './drawer-items';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import CloudIcon from '@material-ui/icons/Cloud';

import { makeStyles } from '@material-ui/core/styles';
import { DoneTwoTone } from '@material-ui/icons';


import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore';
import { useRouter } from 'next/router';
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    toolbar: {
      paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 8px',
      ...theme.mixins.toolbar,
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: 36,
    },
    menuButtonHidden: {
      display: 'none',
    },
    title: {
      flexGrow: 1,
    },
    drawerPaper: {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerPaperClose: {
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9),
      },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      height: '100vh',
      overflow: 'auto',
    },
    container: {
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4),
    },
    paper: {
      padding: theme.spacing(2),
      display: 'flex',
      overflow: 'auto',
      flexDirection: 'column',
      alignContent: 'space-between',
    },
    fixedHeight: {
      height: 240,
    },
}))

export default function drawer({open, handleDrawerClose}){
    
    const classes = useStyles();
    const router = useRouter();
    const handleSignOut = () =>{
      firebase.auth().signOut().then(function(){
        console.log('Signed Out');
      }).catch(function(error) {
        console.error('Sign Out Error', error);
      });
      router.push('/authentication/login');
    };
    return (
        <Drawer
            variant="permanent"
            classes={{paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),}}
            open={open}
        >   
            <div style={{display:'flex', flexDirection: 'column',justifyContent: 'space-between',height:'100%'}}>

            <div style={{display: 'flex',flexDirection: 'column',justifyContent: 'space-between',}}>
            
            <div className={classes.toolbarIcon}>
            {open? (<div style={{display: 'flex',alignItems: 'center',justifyContent: 'space-between',}}><List><ListItem><ListItemIcon><div style={{height:'24.7px', 'marginRight':'14px'}}><img src='/dfslogo.svg' height='19.922' width='52.255'/></div></ListItemIcon><div style={{fontSize: '1.2rem', fontWeight: '500'}}>DFS-IAS</div></ListItem></List></div>):''}
                <IconButton onClick={handleDrawerClose}><ChevronLeftIcon /></IconButton>
            </div>
            <Divider />
                <List>{DrawerItems}</List>
            <Divider />  
            </div>
            <div style={{display: 'flex',flexDirection: 'column',justifyContent: 'space-between',}}>
            <Divider /> 
            <List>
            <ListItem button onClick={()=>handleSignOut()}>
              <ListItemIcon><ExitToAppIcon /></ListItemIcon>
              <ListItemText primary='Sign Out' />
            </ListItem>
            </List>
            <Divider /> 
            </div>
                          
            </div>
        </Drawer>
    );
};
