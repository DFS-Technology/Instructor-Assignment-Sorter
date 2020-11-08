import React, { useState, useEffect, useContext, createContext } from "react";
import initFirebase from './initFirebase';
import firebase from "firebase/app";
import "firebase/auth";
import { useRouter } from "next/router";

// Add your Firebase credentials
initFirebase();

const authContext = createContext();

// Provider component that wraps your app and makes auth object ...
// ... available to any child component that calls useAuth().
export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const useAuth = () => {
  return useContext(authContext);
};

// Provider hook that creates auth object and handles state
function useProvideAuth() {
  const [user, setUser] = useState(null);
  const [pageName, setPageName] = useState('Home');
  const [currentSeason, setCurrentSeason] = useState('');
  const [seasonList, setSeasonList] = useState([]);
  const [loading, setLoading] = useState(false);

  
  // Wrap any Firebase methods we want to use making sure ...
  // ... to save the user to state.
  const signin = (email, password) => {
    console.log("Firebase signin", email);
    return firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(response => {
        setUser(response.user);
        return response.user;
      });
  };

  const signup = (email, password) => {
    return firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(response => {
        setUser(response.user);
        return response.user;
      });
  };

  const signout = () => {
    console.log("Firebase signout", user.email)
    return firebase
      .auth()
      .signOut()
      .then(() => {
        setUser(false);
      });
  };

  const sendPasswordResetEmail = email => {
    return firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        return true;
      });
  };

  const confirmPasswordReset = (code, password) => {
    return firebase
      .auth()
      .confirmPasswordReset(code, password)
      .then(() => {
        return true;
      });
  };

  // Subscribe to user on mount
  // Because this sets state in the callback it will cause any ...
  // ... component that utilizes this hook to re-render with the ...
  // ... latest auth object.
  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      if(user){
        setUser(user);
        console.log("0. Auth State Changed, logged in: ", user.email);
      }else{
        setUser(false);
        console.log("-1. Auth State Changed, logged out.");
      }
    });
    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);
  
  // Return the user object and auth methods
  return {
    user, signin, signup, signout, sendPasswordResetEmail, confirmPasswordReset,
    pageName, setPageName, currentSeason, setCurrentSeason, seasonList, setSeasonList,
  };
}


export function useRequireAuth(redirectUrl = '/login'){
  const auth = useAuth();
  const router = useRouter();
  
  // If auth.user is false that means we're not
  // logged in and should redirect.
  useEffect(() => {
    if(auth.user === false){
      router.push(redirectUrl);
    }
  }, [auth]);
  return auth;
}
export function useAlreadyAuth(redirectUrl = '/'){
  const auth = useAuth();
  const router = useRouter();
  
  
  useEffect(() => {
    if (auth.user){
      router.push(redirectUrl);
    }
  }, [auth]);
  return auth;
}