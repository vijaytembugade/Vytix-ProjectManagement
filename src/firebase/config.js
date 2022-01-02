import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyD2qTeau9gKOvXOUuHcSwfpmxaYllFXrhU",
    authDomain: "vytix-projectmanagement.firebaseapp.com",
    projectId: "vytix-projectmanagement",
    storageBucket: "vytix-projectmanagement.appspot.com",
    messagingSenderId: "441473037590",
    appId: "1:441473037590:web:5de5499e25a7dd10b38c37"
  };

//init firebase 
firebase.initializeApp(firebaseConfig)

//init services
const projectFirestore = firebase.firestore()
const projectAuth = firebase.auth()
const projectStorage = firebase.storage()
const googleAuthProvider = new firebase.auth.GoogleAuthProvider(); 

//timestamp
const timestamp = firebase.firestore.Timestamp

export {projectAuth, projectFirestore, timestamp, projectStorage, googleAuthProvider}