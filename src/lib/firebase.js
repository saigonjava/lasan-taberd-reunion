import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBLWZ_SOUkaoM8n9qCHAuf4UrY4zQuw1eA",
  authDomain: "lasan-taberd-reunion.firebaseapp.com",
  projectId: "lasan-taberd-reunion",
  storageBucket: "lasan-taberd-reunion.firebasestorage.app",
  messagingSenderId: "96907325894",
  appId: "1:96907325894:web:4b8fe184541f1bef6f82c7",
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
