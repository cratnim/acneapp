import Firebase from 'firebase';
let config = {
    apiKey: "AIzaSyDlI7OjHIYU5dYqw_B_EgCArRMWmrfh8bs",
    authDomain: "acne-01-c2f46.firebaseapp.com",
    databaseURL: "https://acne-01-c2f46.firebaseio.com",
    projectId: "acne-01-c2f46",
    storageBucket: "acne-01-c2f46.appspot.com",
    messagingSenderId: "556693584301",
    //appId: "1:431321070097:web:4cf9af907da3e7d9158fb0"
};
let app = Firebase.initializeApp(config);
export const db = app.database();