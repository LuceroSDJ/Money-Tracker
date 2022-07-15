import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

//REPLACE WITH FIREBASE CONGIG OBJECT PROVIDED IN YOUR PROJECT SETTINGS
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_authDomain",
  projectId: "YOUR_projectId",
  storageBucket: "YOUR_storageBucket",
  messagingSenderId: "YOUR_messagingSenderId",
  appId: "YOUR_appId"
};

  //initialize firebase
  firebase.initializeApp(firebaseConfig);

  //initialize service
  const projectFirestore = firebase.firestore();
  const projectAuth = firebase.auth();

  //timestamp
  const timestamp = firebase.firestore.Timestamp;
  //this returns a function now store in this timestamp constant 
  //and when we call it, it will create a timestamp data property used in firestored dbs

  export {projectFirestore, projectAuth, timestamp};