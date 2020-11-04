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
    var currentSeason = [];
    db.collection('Seasons').get().then(
        (Seasons) => {
            Seasons.forEach((doc) => {
                seasonList.push(doc.id);
                currentSeason.push(seasonList[0]);
                //doc.data().lastEdited.timestamp < min ? min = doc.data() : null;
            })
        }
    ).catch(function(error){
        console.error(error);
    });

    console.log(seasonList,currentSeason);
    return [seasonList, currentSeason];
};

export function getDocuments(userPackage, table_type){
    console.log('Reading New Document List');
    const db = firebase.firestore();
    const currentSeason = userPackage.curSeason
    if(!userPackage.seasons.includes(currentSeason[0])){
        return [];
    }
    var DocumentList = [];
    var newDocument = {};
    db.collection('Seasons').doc(currentSeason[0]).collection(table_type).get().then(
        (Documents) => {
            Documents.forEach((Document) => {
                newDocument = Document.data();
                newDocument.id = DocumentList.id;
                DocumentList.push(newDocument);
            })
        }
    ).catch(function(error){
        console.error(error);
    });
    return DocumentList;
};

export function addDocuments(currentSeason, table_type, added){
    console.log('Adding New Document');
    const db = firebase.firestore();
    var ret = [];
    added.map(item => {
        db.collection('Seasons').doc(currentSeason[0]).collection(table_type).add(item).then(
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
        db.collection('Seasons').doc(currentSeason[0]).collection(table_type).doc(item.id).set(item).then(
            function(){
                return null;
            }
        ).catch(function(error){
            console.error("Error adding document: ", error);
        })
    }})
    return null;
};