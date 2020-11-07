var firebase = require('firebase/app');


var instructor = {
    // id :{ incrementalId: 0},
    name : { faker: 'name.findName'},
    gender : { chance: 'gender' },
    schoolYear : {values: ['1st Year', '2nd Year', '3rd Year', '4th Year', '4+ Years']},
    major : {values: ['CS', 'EECS', 'Maths', 'Physics', 'Econ']},
    university : {values: ['UCI', 'UCLA', 'USC', 'UC Davis', 'UCSC']},
    region : {values: ['Irvine', 'Los Angeles', 'Orang County']},
    startingLocation : {faker: 'address.streetAddress', locale: 'en_US'},
    car : {chance: 'bool'},
    returner : {chance: 'bool'},
    shirtSize : {values: ['S', 'M', 'L', 'XL']},
    programs : {randexp: /(Appjam,)?(WebJam,)?/},
    languages : {randexp: /(Spanish,)?(Chinese,)?(Korean,)?(Hindi,)?/}
};

var mocker = require('mocker-data-generator').default;
var util = require('util');
var data = mocker()
    .schema('Instructors', instructor, 100)
    .buildSync();



const config = {
  apiKey: "AIzaSyBEOLvTyc_33K8iuObEU7U-WiFV8O5U6Ik",
  authDomain: "instructor-assignment-sorter.firebaseapp.com",
  databaseURL: "https://instructor-assignment-sorter.firebaseio.com",
  projectId: "instructor-assignment-sorter",
  storageBucket: "instructor-assignment-sorter.appspot.com",
  messagingSenderId: "309533915424",
  appId: "1:309533915424:web:e29402a5265def9832bf45"
};

function initFirebase() {
  if (!firebase.apps.length) {
    console.log("Firebase Initiated");
    firebase.initializeApp(config);
  }
}
 
initFirebase();
var db = require('firebase/database');;
const db1 = firebase.database();
var ret = [];
var oldRef = db1.ref('/');

// data.Instructors.map(item => {
//     var newRef = oldRef.push();
//     console.log(newRef.key);
//     newRef.set(item).catch((e)=>console.log("Error Found: +++++++++++++++++++++++++",e));
// });
