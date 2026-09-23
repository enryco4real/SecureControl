// firebase config initialization
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBI2r3a8h54f7_-8Vz3jG4d3sAXdkawiRA",
  authDomain: "control-97154.firebaseapp.com",
  projectId: "control-97154",
  storageBucket: "control-97154.firebasestorage.app",
  messagingSenderId: "211588521262",
  appId: "1:211588521262:web:82d401473850a9d0fceebf",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);