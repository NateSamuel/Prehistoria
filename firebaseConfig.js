import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAoBMo2DA7Cmk4I0SYKckM1Aw8lbKvMM7M",
  authDomain: "mobiledev-e642c.firebaseapp.com",
  projectId: "mobiledev-e642c",
  storageBucket: "mobiledev-e642c.firebasestorage.app",
  messagingSenderId: "957063891421",
  appId: "1:957063891421:web:8d4530628f583f76bb8e34",
  measurementId: "G-3PW3RDKV3R"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
