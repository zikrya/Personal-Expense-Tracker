import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, set, get, child } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD5gP-m3Tfn_0Cao9-_RtgTDFcCnsF3nBA",
  authDomain: "personal-expense-tracker-dbb0d.firebaseapp.com",
  projectId: "personal-expense-tracker-dbb0d",
  storageBucket: "personal-expense-tracker-dbb0d.appspot.com",
  messagingSenderId: "33795573188",
  appId: "1:33795573188:web:b72ed71684aa4a02695091"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth();

const database = getDatabase(app);

// Allows for mocking during testing
let databaseSet = set;
let databaseGet = get;

export function __setMockFunctions(setMock, getMock) {
  databaseSet = setMock;
  databaseGet = getMock;
}

export const updateUserName = async function(uid, name) {
  await databaseSet(ref(database, `users/${uid}/name`), name);
}

export const getUserName = async function(uid) {
  const snapshot = await databaseGet(child(ref(database), `users/${uid}/name`));
  return snapshot.val();
}

