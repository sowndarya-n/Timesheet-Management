import firebase from "firebase/app";
import "firebase/auth";

var firebaseConfig = firebase.initializeApp({
    apiKey: "AIzaSyDMVlY0KFvexKOMvYuYoP_V8wtVIYuNXtQ",
    authDomain: "auth-development-auth.firebaseapp.com",
    projectId: "auth-development-auth",
    storageBucket: "auth-development-auth.appspot.com",
    messagingSenderId: "980771815326",
    appId: "1:980771815326:web:28d6efd83cb7a3a76c208f"
  });

  // export const auth = firebaseConfig.auth();

  export default firebaseConfig;