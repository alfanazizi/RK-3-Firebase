import * as firebase from 'firebase'; 
import firestore from 'firebase/firestore';

const firebaseConfig = {
apiKey: "",
authDomain: "",
databaseURL: "" ,
projectId: "",
storageBucket: "" ,
messagingSenderId: "", 
appId: "",
measurementId: ""
};


firebase.initializeApp(firebaseConfig);

firebase.firestore();


export default firebase;