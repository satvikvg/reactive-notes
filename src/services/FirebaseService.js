import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import { CONFIG } from "../config/config";

const FirebaseService = firebase.initializeApp(CONFIG);
export default FirebaseService;
