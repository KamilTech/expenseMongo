import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const config = {
    apiKey: "AIzaSyA7Tt-pYM4PXvAol197jf_aI9gsGg1OMds",
    authDomain: "expensify-56f2e.firebaseapp.com",
    databaseURL: "https://expensify-56f2e.firebaseio.com",
    projectId: "expensify-56f2e",
    storageBucket: "expensify-56f2e.appspot.com",
    messagingSenderId: "152958035099"
};
firebase.initializeApp(config);
const database = firebase.database();

const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export { firebase, googleAuthProvider ,database as default };