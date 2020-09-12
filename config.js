import firebase from "firebase";
require("@firebase/firestore");

const firebaseConfig = {
    apiKey: "AIzaSyC77r8-KeQagKda8Pre0z3K-fOEcGqjAVI",
    authDomain: "barter-system-app-fe148.firebaseapp.com",
    databaseURL: "https://barter-system-app-fe148.firebaseio.com",
    projectId: "barter-system-app-fe148",
    storageBucket: "barter-system-app-fe148.appspot.com",
    messagingSenderId: "292110924828",
    appId: "1:292110924828:web:6cf297bb5ac2f174b233d9"
  };
  
  firebase.initializeApp(firebaseConfig);

  export default firebase.firestore(); 