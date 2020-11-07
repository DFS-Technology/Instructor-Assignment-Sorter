import firebase from 'firebase/app'
import 'firebase/database';

import {sampleData} from '../sample-data/sampleData';

const db = firebase.database();

export async function firestoreGet(id, currentSeason){
    if(id === 'Seasons'){
      console.log("2. Reading Seasons: ");
      return db.ref('Seasons').once('value').then(
        (Snapshot) => {
            var seasonList = [];
            for (const key in Snapshot.val()){
                seasonList.push(Snapshot.val()[key]);
            }
            return seasonList;
        }
      );
    }else{
      console.log("3.1 Reading Document: ",id);
      return db.ref(currentSeason+'/'+id).once('value').then(
        (Snapshot) => {
            var documentList = [];
            var newDocument = {};
            for (const key in Snapshot.val()){
                newDocument = Snapshot.val()[key];
                newDocument.id = key;
                documentList.push(newDocument);
            }
            return documentList;
        }
      ).catch((e)=>console.log("3.2 Reading Document Error,",currentSeason,id,e));
    }
};

export function getDocuments(currentSeason, table_type){
    console.log(sampleData.Instructors);
    const getSamplse = async (table_type) => {return (table_type === 'Instructors'? sampleData.Instructors : []);};
    return getSamplse(table_type);
    
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
    var oldRef = db.ref(currentSeason+'/'+table_type);
    var newIds = [];
    added.map(item => {
        var newRef = oldRef.push();
        newIds.push(newRef.key);
        newRef.set(item).catch(e=>console.log("Error Adding document: ", e));
    });
    return newIds;
};
export function editDocuments(currentSeason, table_type, changed, changedRows){

    changedRows.map(item => { if (changed[item.id]){
        db.ref(currentSeason+'/'+table_type+'/'+item.id)
            .set(item)
            .catch(e=>console.log("Error Editing document: ", e))
    }})
    return null;
};
export function deleteDocuments(currentSeason, table_type, deleted){
    console.log("Deleteing DOcs", deleted
    )
    deleted.forEach(item => {
        db.ref(currentSeason+'/'+table_type+'/'+item)
            .remove()
            .catch(e=>console.log("Error Editing document: ", e))
    });
    return null;
};