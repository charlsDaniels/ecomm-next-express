import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from "firebase/auth";

interface FirebaseConfigInterface {
  apiKey?: string,
  authDomain?: string,
  projectId?: string,
  storageBucket?: string,
  messagingSenderId?: string,
  appId?: string
}

const firebaseConfig: FirebaseConfigInterface = {
  apiKey: process.env.firebase_apiKey,
  authDomain: process.env.firebase_authDomain,
  projectId: process.env.firebase_projectId,
  storageBucket: process.env.firebase_storageBucket,
  messagingSenderId: process.env.firebase_messagingSenderId,
  appId: process.env.firebase_appId,
};

const app = initializeApp(firebaseConfig);

const firestore = getFirestore(app);

const auth = getAuth(app);

export { firestore, auth };