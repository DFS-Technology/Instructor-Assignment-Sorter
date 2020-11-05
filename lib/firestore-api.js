import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore';
import initFirebase from './init-firebase';
import {sampleData} from '../sample-data/sampleData';

// export const db = firebase.firestore();
// export function initFirestore(){
//     initFirebase();
//     var db = firebase.firestore();
//     return db;
// }
// export function getCurrentSeason(SeasonList){
    
    
// }
export async function getInitialData(){
    return ['Debug Mode'];
    console.log('################# Reading New Season List #################');

    const db = firebase.firestore();
    
    return db.collection('Seasons').get().then(
        (Seasons) => {
            var seasonList = [];
            var currentSeason = '';
            Seasons.forEach((doc) => {
                seasonList.push(doc.id);
                //doc.data().lastEdited.timestamp < min ? min = doc.data() : null;
            })
            currentSeason = seasonList[0];
            console.log(seasonList,currentSeason);
            return [seasonList, currentSeason];
        }
    ).catch(function(error){
        console.error("Error Reading Seasons: ",error);
    });

    
};

export function getDocuments(currentSeason, table_type){
    return (table_type === 'Instructors'? sampleData.Instructors : []);
    console.log('################# Reading New Document List #################');
    const db = firebase.firestore();
    return db.collection('Seasons').doc(currentSeason).collection(table_type).get().then(
        (Documents) => {
            var DocumentList = [];
            var newDocument = {};
            Documents.forEach((Document) => {
                newDocument = Document.data();
                newDocument.id = Document.id;
                DocumentList.push(newDocument);
            });
            return DocumentList;
        }
    ).catch(function(error){
        console.error("Error Reading Documents: ",error);
    });
};

export function addDocuments(currentSeason, table_type, added){
    return [];
    //change commitChanges as well
    console.log('################# Adding New Document #################');
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
    return null;
    console.log('################# Editing Old Document #################');
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