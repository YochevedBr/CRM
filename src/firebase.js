import firebase from 'firebase'
import 'firebase/storage'


var firebaseConfig = {
    apiKey: "AIzaSyCiBqJSKrWyAXkJmj5Tl6i_ruxNp2IO8MY",
    authDomain: "crm-db-38a1f.firebaseapp.com",
    databaseURL: "https://crm-db-38a1f-default-rtdb.firebaseio.com",
    projectId: "crm-db-38a1f",
    storageBucket: "crm-db-38a1f.appspot.com",
    messagingSenderId: "1001011822098",
    appId: "1:1001011822098:web:4f008e9de8c37abbdba2cb",
    measurementId: "G-9CT5FZFHP1"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const storage = firebase.storage()

  firebase.analytics();

  // export default firebase;
  export  {
    storage, firebase as default
  }