import Layout from '../../components/layout/layout'
import { useRouter } from 'next/router';
import React, {useEffect, useState} from 'react';
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore';

export default function Progrmas({userPackage}) {
  const router = useRouter();
  var user =  firebase.auth().currentUser;
  useEffect(()=>{
    if(!user){
      router.push('/authentication/login');
    }
  },  [user]);
  // firebase.auth().onAuthStateChanged(function(tempUser) {
  //   if(!tempUser){
  //     router.push('/authentication/login');
  //   }
  // });
  return (
    <Layout  pageName='Programs' userPackage={userPackage}></Layout>
  );
}
