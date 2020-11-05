import Head from 'next/head'
import Layout from '../components/layout/layout'
import styles from '../styles/Home.module.css'
import { useRouter } from 'next/router';
import React, {useEffect, useState} from 'react';
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore';
import { useRequireAuth } from "../lib/use-require-auth.js";
export default function Home() {
  const router = useRouter();
  var user =  firebase.auth().currentUser;
  const auth = useRequireAuth();
  // useEffect(()=>{
  //   if(!user){
  //     router.push('/authentication/login');
  //   }
  // },  [user]);
  // firebase.auth().onAuthStateChanged(function(tempUser) {
  //   if(!tempUser){
  //     router.push('/authentication/login');
  //   }
  // });

  
  console.log(auth.user);
  return (
    <Layout pageName ='Homepage' >
    </Layout>
  );
}
