import firebase from "firebase/compat/app";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDhfjAYQ8DwJ4xZ2Nkcnpy0l23_X7e2-fo",
  authDomain: "twit-b261e.firebaseapp.com",
  projectId: "twit-b261e",
  storageBucket: "twit-b261e.appspot.com",
  messagingSenderId: "764230294790",
  appId: "1:764230294790:web:b82f946d44182248b59287",
  measurementId: "G-EL9PYPSTVF",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };
