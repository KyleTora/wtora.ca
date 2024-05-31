import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getPerformance } from "firebase/performance";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "wtora-3b8e4.firebaseapp.com",
  projectId: "wtora-3b8e4",
  storageBucket: "wtora-3b8e4.appspot.com",
  messagingSenderId: "202062603067",
  appId: "1:202062603067:web:75143d98b0f69de54e0d1e",
  measurementId: "G-CEFZN2KQ0E"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const perf = getPerformance(app);

export {app, analytics, auth, perf};