import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getDatabase, ref, set, get, child } from "firebase/database";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore";

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
const database = getDatabase(app);

export const auth = getAuth(app);
export const storage = getStorage(app);
export const firestore = getFirestore(app);

/* export async function updateUserName(uid, name) {
  await set(ref(database, `users/${uid}/name`), name);
} */

export async function getUserName(uid) {
  const snapshot = await get(child(ref(database), `users/${uid}/name`));
  return snapshot.val();
}
export async function saveSurveyData(data) {
  try {
      const docRef = await addDoc(collection(firestore, "surveys"), data);
      return docRef.id;
  } catch (error) {
      console.error("Error saving survey data: ", error);
  }
}
export async function markSurveyAsCompleted(uid) {
  await set(ref(database, `users/${uid}/hasCompletedSurvey`), "true");
}
// function for getting profile data 
// export async function saveProfileData(data) {
//   try {
//       const docRef = await addDoc(collection(firestore, "profileData"), data);
//       return docRef.id;
//   } catch (error) {
//       console.error("Error saving profile data: ", error);
//   }
// }
