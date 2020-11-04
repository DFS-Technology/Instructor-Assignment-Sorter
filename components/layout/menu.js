import React from 'react';

import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';

import Drawer from '@material-ui/core/Drawer';

import Grid from '@material-ui/core/Grid';

import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';


import { MenuItems, SignOut, DFSIcon } from './menuItems';

import firebase from 'firebase/app'
import 'firebase/auth'

import { useRouter } from 'next/router';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
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
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
}));

export default function Menu({open, handleDrawerClose}){
    
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
          <Grid
            container
            direction="column"
            justify="space-between"
            style={{height: '100%'}}
          >
            <Grid item>
              <div className={classes.toolbarIcon}>
              {open? (<div style={{display: 'flex',alignItems: 'center',justifyContent: 'space-between',}}><DFSIcon /></div>):''}
                  <IconButton onClick={handleDrawerClose}><ChevronLeftIcon /></IconButton>
              </div>
              <Divider /><MenuItems /><Divider />  
            </Grid>

            <Grid item>
              <Divider /><SignOut handleSignOut={handleSignOut} /><Divider />
            </Grid> 
          
          </Grid>       

      </Drawer>
    );
};
