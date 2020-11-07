import React, {useState} from 'react';
import Button from '@material-ui/core/Button';

import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import Typography from '@material-ui/core/Typography';

import Grid from '@material-ui/core/Grid';

import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import IconButton from '@material-ui/core/IconButton';
import Fab from '@material-ui/core/Fab';
import MenuIcon from '@material-ui/icons/Menu';
import AddIcon from '@material-ui/icons/Add';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import SnackbarContent from '@material-ui/core/SnackbarContent';

import { useAuth } from "../../lib/useAuth.js";
import { useRouter } from 'next/router';
import {mutate} from 'swr';

import firebase from 'firebase/app'
import 'firebase/database';

export default function appBar({open, handleDrawerOpen}){
    const classes = useStyles();
    const {pageName, currentSeason, setCurrentSeason, seasonList, setSeasonList} = useAuth();
    const router = useRouter();
    const [deleteOpen, setDeleteOpen] = useState(false);
    
    const handleSeasonChange = (value) => { setCurrentSeason(value); router.push('/'); }
    const handleAdd = ()=>{};
    const handleSeasonDelete = ()=>{
      setDeleteOpen(false);
      var newSeasonList = seasonList.filter(season=> season!==currentSeason);
      mutate(['Seasons',null],newSeasonList,false);
      // firebase.database().ref(currentSeason).remove();
      // firebase.database().ref('Seasons/'+currentSeason).remove();
      setSeasonList(newSeasonList);
      setCurrentSeason(newSeasonList[0]);
      router.push('/');
    };
    const action = (
       <>
      <Button style={{color: "#f44336"}} onClick={()=>{handleSeasonDelete()}} size="small">Delete</Button>
      <Button style={{color: "#f44336"}} onClick={()=>setDeleteOpen(false)} size="small">Cancel</Button>
       </>
    );

    return (
      <>
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
          
          <Toolbar className={classes.toolbar}>
              
              <IconButton edge="start" color="inherit" aria-label="open drawer" onClick={handleDrawerOpen} className={clsx(classes.menuButton, open && classes.menuButtonHidden)}>
                
                <MenuIcon />
              </IconButton>

              <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                
                {pageName}
              </Typography>
              
              <Grid container direction="row" justify="flex-end" alignItems="center" spacing={2} style={{width: 'auto'}}>
                
                <Grid item>
                
                <FormControl className={classes.formControl}>
                  
                  <InputLabel id="SeasonLabel">Season</InputLabel>
                  
                  <Select labelId="SeasonLabel" id="SeasonSelect" value={currentSeason} onChange={(event)=>handleSeasonChange(event.target.value)}>
                    {seasonList.map(season => (<MenuItem  value={season} key={season}>{season}</MenuItem >))}
                  </Select>
                </FormControl>
                </Grid>

                <Grid item>
                  <Fab color="secondary" size='small' aria-label="delete" onClick={()=>setDeleteOpen(true)}>
                      <DeleteOutlineIcon />
                  </Fab>
                </Grid>

                <Grid item>
                  <Fab color="secondary" size='small' stype aria-label="add" onClick={handleAdd}>
                      <AddIcon />
                  </Fab>
                </Grid>
              </Grid>
          </Toolbar>
      </AppBar>
      <Snackbar style={{width:"100%"}} message={"Are you sure you want to delete \""+currentSeason+"\" database?"} anchorOrigin={{vertical:'bottom', horizontal:'center'}} open={deleteOpen} action={action}></Snackbar>
      {/* <div style={{maxWidth: 400}}>
      <SnackbarContent message="I love snacks." action={action} /></div> */}
      {/* <Snackbar style={{width:'100%', marginTop:"16px"}} anchorOrigin={{vertical:'bottom', horizontal:'center'}} open={confirmOpen} action={action}>
        <MuiAlert style={{width:'auto', height:'auto', marginTop:"16px"}}elevation={6} variant="filled" severity="warning">
          <div style={{display:"inline", alignContent:"center"}}>Are you sure you want to delete the <Typography  noWarp display="inline" style={{fontWeight: 500}}>{currentSeason}</Typography> database?
          <Button variant="contained"  size="small" style={{margin:'0px 10px'}}>Yes</Button>
          <Button color="secondary" size="small" style={{margin:'0px 10px'}}>Cancel</Button></div>
          </MuiAlert>
      </Snackbar> */}
      </>
    );
};
// <div style={{display:'inline',color:'black', fontWeight:500, fontSize:'1.1em'}}></div>
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
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
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
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
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));