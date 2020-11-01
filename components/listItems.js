import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PeopleIcon from '@material-ui/icons/People';
import ExtensionIcon from '@material-ui/icons/Extension';
import SchoolIcon from '@material-ui/icons/School';
import Nextlink from 'next/link'



export const mainListItems = (
  <div>
    <Nextlink href='/instructors'>
    <ListItem button>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Instructors" />
    </ListItem>
    </Nextlink>
    <Nextlink href='/schools'>
    <ListItem button>
      <ListItemIcon>
        <SchoolIcon />
      </ListItemIcon>
      <ListItemText primary="Schools" />
    </ListItem>
    </Nextlink>
    <Nextlink href='/programs'>
    <ListItem button>
      <ListItemIcon>
        <ExtensionIcon />
      </ListItemIcon>
      <ListItemText primary="Programs" />
    </ListItem>
    </Nextlink>
  </div>
);
