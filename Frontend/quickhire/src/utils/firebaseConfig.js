// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
 
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAeyFuIDm34sjFU0_yGgMTJmpyJTCmoE5k",
  authDomain: "quickhire-d317e.firebaseapp.com",
  projectId: "quickhire-d317e",
  storageBucket: "quickhire-d317e.appspot.com",
  messagingSenderId: "555602753102",
  appId: "1:555602753102:web:079c29f38d2d033b38f51f"
};
 
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const imageStorage = getStorage(app);