import React from 'react';

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

export default function appBar({open, handleDrawerOpen, pageName, userPackage}){
    const classes = useStyles();
    
    const setCurSeasonHandler = (event) => {
      userPackage.setCurSeason([event.target.value]);
    };
    
    return (
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
          <Toolbar className={classes.toolbar}>
              <IconButton
                  edge="start"
                  color="inherit"
                  aria-label="open drawer"
                  onClick={handleDrawerOpen}
                  className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
              >
                <MenuIcon />
              </IconButton>


              <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                {pageName}
              </Typography>
              <Grid
                container
                direction="row"
                justify="flex-end"
                alignItems="center"
                spacing={2}
                style={{width: 'auto'}}
              >
                <Grid item>
                <FormControl className={classes.formControl}>
                  <InputLabel id="SeasonLabel">Season</InputLabel>
                  <Select
                      labelId="SeasonLabel"
                      id="SeasonSelect"
                      value={userPackage.curSeason[0]}
                      onChange={(event)=>setCurSeasonHandler(event)}
                  >
                    {userPackage.seasons.map(season => (<MenuItem  value={season} key={season}>{season}</MenuItem >))}
                  </Select>
                </FormControl>
                </Grid>

                <Grid item>
                <Fab color="secondary" size='small' aria-label="delete">
                    <DeleteOutlineIcon />
                </Fab>
                </Grid>

                <Grid item>
                <Fab color="secondary" size='small' stype aria-label="add">
                    <AddIcon />
                </Fab>
                </Grid>
                </Grid>
          </Toolbar>
      </AppBar>
    );
};

