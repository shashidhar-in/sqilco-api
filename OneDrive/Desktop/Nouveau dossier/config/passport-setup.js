import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const passport = require('passport');

const firebaseConfig = {
    apiKey: "AIzaSyBE8MMqsYY6Z9CYjz4-TKFi1mDRc9u86VY",
    authDomain: "sqilco.firebaseapp.com",
    projectId: "sqilco",
    storageBucket: "sqilco.appspot.com",
    messagingSenderId: "996457606073",
    appId: "1:996457606073:web:923a0e83d7400fa5706468",
    measurementId: "G-FFL4FY7G5S"
};

passport.use(new Firebase)