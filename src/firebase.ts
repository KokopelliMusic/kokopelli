import firebase from 'firebase/app'
import 'firebase/auth'
import { FIREBASE_CONFIG } from './config.json'

firebase.initializeApp(FIREBASE_CONFIG)

export default firebase 
export const firebaseAuth = firebase.auth()