import React from 'react';

import Nextlink from 'next/link'


import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import HomeIcon from '@material-ui/icons/Home';
import PeopleIcon from '@material-ui/icons/People';
import SchoolIcon from '@material-ui/icons/School';
import ExtensionIcon from '@material-ui/icons/Extension';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ApartmentIcon from '@material-ui/icons/Apartment';

export function MenuItems(){
  const menuItems = [
    {address: '/', name: 'Home', icon: <HomeIcon />},
    {address: '/menu/instructors', name: 'Instructors', icon: <PeopleIcon />},
    {address: '/menu/schools', name: 'Schools', icon: <ApartmentIcon />},
    {address: '/menu/programs', name: 'Programs', icon: <ExtensionIcon />},
  ];

  return (
    <List>
      {menuItems.map((item) => 
        <Nextlink key={'Link'.concat(item.name)} href={item.address}>
          <ListItem button key={'button'.concat(item.name)}>
            <ListItemIcon key={'icon'.concat(item.name)}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.name} key={'text'.concat(item.name)}/>
          </ListItem>
        </Nextlink>
      )}
    </List>
  );
};

export function SignOut({handleSignOut}){
  
  return (
    <List>
      <ListItem button onClick={()=>handleSignOut()}>
        <ListItemIcon><ExitToAppIcon /></ListItemIcon>
        <ListItemText primary='Sign Out' />
      </ListItem>
    </List>
  );
};

export function DFSIcon(){
  return (
    <List>
      <ListItem>
        <ListItemIcon>
          <div style={{height:'24.7px', 'marginRight':'14px'}}>
            <img src='/dfslogo.svg' height='19.922' width='52.255'/>
          </div>
        </ListItemIcon>
        <div style={{fontSize: '1.2rem', fontWeight: '500'}}>
          DFS-IAS
        </div>
      </ListItem>
    </List>
  );
};



