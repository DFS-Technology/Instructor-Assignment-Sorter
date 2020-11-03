import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore';
import initFirebase from './init-firebase'


// export const db = firebase.firestore();
// export function initFirestore(){
//     initFirebase();
//     var db = firebase.firestore();
//     return db;
// }
// export function getCurrentSeason(SeasonList){
    
    
// }
export function getInitialData(){
    console.log('Reading New Season List');
    const db = firebase.firestore();
    var seasonList = [];
    var currentSeason = '';
    db.collection('Seasons').get().then(
        (Seasons) => {
            Seasons.forEach((doc) => {
                seasonList.push(doc.id);
                currentSeason = doc.id;
                //doc.data().lastEdited.timestamp < min ? min = doc.data() : null;
            })
        }
    ).catch(function(error){
        console.error(error);
    });
    console.log(seasonList,currentSeason);
    return [seasonList, currentSeason];
};

export function getInstructors(currentSeason){
    console.log('Reading New Instructor List');
    const db = firebase.firestore();
    
    var InstructorList = [];
    var newInstructor = {};
    db.collection('Seasons').doc(currentSeason).collection('Instructors').get().then(
        (Instructors) => {
            Instructors.forEach((Instructor) => {
                newInstructor = Instructor.data();
                newInstructor['id'] = InstructorList.id;
                InstructorList.push(newInstructor);
            })
        }
    ).catch(function(error){
        console.error(error);
    });
    return InstructorList;
};

export function getSchools(currentSeason){
    console.log('Reading New School List');
    const db = firebase.firestore();
    
    var SchoolList = [];
    var newSchool = {};
    db.collection('Seasons').doc(currentSeason).collection('Schools').get().then(
        (Schools) => {
            Schools.forEach((School) => {
                newSchool = School.data();
                newSchool['id'] = School.id;
                SchoolList.push(newSchool);
            })
        }
    ).catch(function(error){
        console.error(error);
    });
    return SchoolList;
};
export function addDocuments(currentSeason, table_type, added){
    console.log('Adding New Document');
    const db = firebase.firestore();
    var ret = [];
    added.map(item => {
        db.collection('Seasons').doc(currentSeason).collection(table_type).add(item).then(
            function(docRef){
                ret.push(docRef.id);
            }
        ).catch(function(error){
            console.error("Error adding document: ", error);
        })
    })
    return ret;
};
export function editDocuments(currentSeason, table_type, changed, changedRows){
    console.log('Editing Old Document');
    const db = firebase.firestore();
    changedRows.map(item => { if (changed[item.id]){
        db.collection('Seasons').doc(currentSeason).collection(table_type).doc(item.id).set(item).then(
            function(){
                return null;
            }
        ).catch(function(error){
            console.error("Error adding document: ", error);
        })
    }})
    return null;
};