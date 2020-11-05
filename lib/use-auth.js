import React, { useState, useEffect, useContext, createContext } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import initFirebase from './init-firebase';
import {getDocuments, getInitialData} from './firestore-api';
import { School, SettingsSystemDaydreamTwoTone } from "@material-ui/icons";

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
  const [user, setUser] = useState(false);
  const [seasonList, setSeasonList] = useState([]);
  const [currentSeason, setCurrentSeason] = useState('');
  const [dataLoaded, setDataLoaded] = useState(false);
  const [instructorRows, setInstructorRows] = useState([]);
  const [schoolRows, setSchoolRows] = useState([]);

  
  // Wrap any Firebase methods we want to use making sure ...
  // ... to save the user to state.
  const signin = (email, password) => {
    return firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(async (response) => {
        const newData = await getInitialData();
        setSeasonList(newData[0]);
        setCurrentSeason(newData[1]);
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
    return firebase
      .auth()
      .signOut()
      .then(() => {
        setUser(false);
        setCurrentSeason('');
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
  const updateCurrentSeason = (value) => {
        setCurrentSeason(() => value);
        setDataLoaded(() => false);
        console.log(currentSeason,dataLoaded, value);
        getDocuments(value, 'Instructors').then(
          (Instructors) => {
            setInstructorRows(() => Instructors)
            return getDocuments(value, 'Schools')
          }).then(
          (Schools) => {
            setSchoolRows(() => Schools);
            setDataLoaded(() => true);
            console.log(instructorRows);
            console.log(schoolRows);
          }
        );
        return ; 
  };
  const setSeasons = async () => {
    const newData = await getInitialData();
    setSeasonList(newData[0]);
    updateCurrentSeason(newData[1]);
    console.log(instructorRows);
    console.log(schoolRows);
  };
  const changeInsturctorRow = (changedRows) => {
    setInstructorRows(changedRows);
  };
  const changeSchoolRow = (changedRows) => {
    setSchoolRows(changedRows);
  };

  // Subscribe to user on mount
  // Because this sets state in the callback it will cause any ...
  // ... component that utilizes this hook to re-render with the ...
  // ... latest auth object.
  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        setUser(user);
      } else {
        setUser(false);
      }
    });
    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);
  
  // Return the user object and auth methods
  return {
    user,
    seasonList,
    currentSeason,
    instructorRows,
    schoolRows,
    setSeasons,
    signin,
    signup,
    signout,
    sendPasswordResetEmail,
    confirmPasswordReset,
    updateCurrentSeason,
    changeInsturctorRow,
    changeSchoolRow,
  };
}