import * as firebase from 'firebase/app'
import 'firebase/storage'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/analytics'

const config = {
    apiKey: "AIzaSyDvc662A-BIM54Exk0rdsEyLDD-VqBqWIU",
    authDomain: "ecodrop-flutter-prototype.firebaseapp.com",
    databaseURL: "https://ecodrop-flutter-prototype.firebaseio.com",
    projectId: "ecodrop-flutter-prototype",
    storageBucket: "ecodrop-flutter-prototype.appspot.com",
    messagingSenderId: "939064988176",
    appId: "1:939064988176:web:d9f67f10ccfba0d4513095",
    measurementId: "G-2HQ87MK89R"
};

firebase.initializeApp(config);

export const app = firebase.app(); 
export const auth = firebase.auth(); 
export const storage = firebase.storage();
export const firestore = firebase.firestore();
export const analytics = firebase.analytics(); 
export default firebase; 