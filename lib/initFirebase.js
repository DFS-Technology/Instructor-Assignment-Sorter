import firebase from 'firebase/app'


const config = {
  apiKey: "AIzaSyBEOLvTyc_33K8iuObEU7U-WiFV8O5U6Ik",
  authDomain: "instructor-assignment-sorter.firebaseapp.com",
  databaseURL: "https://instructor-assignment-sorter.firebaseio.com",
  projectId: "instructor-assignment-sorter",
  storageBucket: "instructor-assignment-sorter.appspot.com",
  messagingSenderId: "309533915424",
  appId: "1:309533915424:web:e29402a5265def9832bf45"
};

export default function initFirebase() {
  if (!firebase.apps.length) {
    console.log("Firebase Initiated");
    firebase.initializeApp(config);
  }
}
 
