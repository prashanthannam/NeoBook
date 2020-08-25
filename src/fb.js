import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/storage'



var firebaseConfig = {
    apiKey: "AIzaSyCNJdTjyrUZq2x358rgjC2svS5LCdtMQvo",
    authDomain: "neobook-21c6a.firebaseapp.com",
    databaseURL: "https://neobook-21c6a.firebaseio.com",
    projectId: "neobook-21c6a",
    storageBucket: "neobook-21c6a.appspot.com",
    messagingSenderId: "171176700567",
    appId: "1:171176700567:web:60a1991bf293b18b3357d2"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
export default db;