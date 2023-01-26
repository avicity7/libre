const dotenv = require("dotenv").config();
var firebase = require("firebase-admin");
var serviceAccount = JSON.parse(process.env.SERVICE_ACCOUNT_KEY);

//Initialise App instance
firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: "https://libre-33bc1.firebaseio.com"
});

//Create db connection
var db = firebase.firestore();

module.exports = db;