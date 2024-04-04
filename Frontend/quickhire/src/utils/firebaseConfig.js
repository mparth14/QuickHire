
/**
 * * Author : Angel Christian
 * Initializes Firebase app and sets up image storage.
 * @module firebaseConfig
 */
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

/**
 * Firebase configuration object.
 * @constant {object}
 */
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API,
  authDomain: "quickhire-d317e.firebaseapp.com",
  projectId: "quickhire-d317e",
  storageBucket: "quickhire-d317e.appspot.com",
  messagingSenderId: "555602753102",
  appId: "1:555602753102:web:079c29f38d2d033b38f51f"
};
 
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const imageStorage = getStorage(app);