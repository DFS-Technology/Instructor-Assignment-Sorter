import React from 'react';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import HomeIcon from '@material-ui/icons/Home';
import PeopleIcon from '@material-ui/icons/People';
import SchoolIcon from '@material-ui/icons/School';
import ExtensionIcon from '@material-ui/icons/Extension';

import Nextlink from 'next/link'

import useStyles from '../../styles/navbar-styles';

const menuItems = [
  {address: '/', name: 'Home', icon: <HomeIcon />},
  {address: '/menu/instructors', name: 'Instructors', icon: <PeopleIcon />},
  {address: '/menu/schools', name: 'Schools', icon: <SchoolIcon />},
  {address: '/menu/programs', name: 'Programs', icon: <ExtensionIcon />},
];

const DrawerItems = (
  <div>
    {menuItems.map((item) => 
      <Nextlink key={'Link'.concat(item.name)} href={item.address}>
        <ListItem button key={'button'.concat(item.name)}>
          <ListItemIcon key={'icon'.concat(item.name)}>{item.icon}</ListItemIcon>
          <ListItemText primary={item.name} key={'text'.concat(item.name)}/>
        </ListItem>
      </Nextlink>
    )}
  </div>
);export default DrawerItems;



