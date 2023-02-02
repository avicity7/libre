import { initializeApp } from 'firebase/app';
import {getFirestore, collection, getDocs} from "firebase/firestore";
//var serviceAccount = JSON.parse(process.env.SERVICE_ACCOUNT_KEY);

const firebaseConfig = {
  apiKey: "AIzaSyA2mqSNB4kIBFtrsaNmvn8qh8-meMI8Ea4",
  authDomain: "libre-33bc1.firebaseapp.com",
  projectId: "libre-33bc1",
  storageBucket: "libre-33bc1.appspot.com",
  messagingSenderId: "958593847328",
  appId: "1:958593847328:web:f4a5cd8016e758e657ac45"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

module.exports = db;