import Layout from '../../components/layout/layout'
import Table from '../../components/table/table'
import { useRouter } from 'next/router';
import React, {useEffect, useState} from 'react';
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore';
import { useRequireAuth } from "../../lib/use-require-auth.js";

export default function Schools() {
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
  
  return (
    <Layout  pageName='Schools' >
          <Table table_type='Schools' />
    </Layout>
  );
}
