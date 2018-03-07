import * as fbase from "firebase";

var config = {
    apiKey: "AIzaSyABka5H54O_iaPXXm16sW2b_7PmkybOfP8",
    authDomain: "zest-de7b0.firebaseapp.com",
    databaseURL: "https://zest-de7b0.firebaseio.com",
    storageBucket: "",
 };
 var pro = new fbase.auth.FacebookAuthProvider();
 pro.addScope('email');
 pro.setCustomParameters({
     'display': 'popup'
   });
   fbase.initializeApp(config);
 var db = fbase.database();

 export const provider = pro;
 export const database = db;
 export const firebase = fbase;