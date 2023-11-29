import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getDatabase, ref, set, get, child } from "firebase/database";
import { getFirestore, orderBy} from "firebase/firestore";
import { collection, addDoc,query,where,getDocs } from "firebase/firestore";


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


export async function addTransactionToDb(data){
      try {
/*         const transactionsRef  = collection(doc(firestore, "User_TransactionDoc",uid), "transaction");
        const docRef = await addDoc(transactionsRef, data); */
        const docRef = await addDoc(collection(firestore,"User_TransactionDoc"),data)
        return docRef.id;
    } catch (error) {
        alert("Error saving transaction data: ");
  }
}


export async function getTransactionFromDB(userID) {
  const collectionRef = collection(firestore, 'User_TransactionDoc'); 
  let trans = [];
  try{
     const q = query(collectionRef, where('userID', '==', userID),orderBy('date','desc'));
     const querySnapshot = await getDocs(q);
     querySnapshot.forEach((doc) => {
        const data = doc.data()
        const id = doc.id;
        trans.push({...data, id});
      });
      //trans.sort((a, b) => (new Date(b.date) - new Date(a.date)))
  }catch(error){
    console.log(error)
  }

  return trans
}

export async function saveUserData(uid, data) {
  try {
      await setDoc(doc(firestore, "users", uid), data);
  } catch (error) {
      console.error("Error saving user data: ", error);
  }
}

 // Function to fetch survey data for a specific user
 export async function fetchSurveyData(userId) {
  const surveysRef = collection(firestore, 'surveys');
  const userQuery = query(surveysRef, where('userId', '==', userId));

  try {
    const querySnapshot = await getDocs(userQuery);
    const surveyData = {};

    querySnapshot.forEach((doc) => {
      surveyData[doc.id] = doc.data();
    });

    return surveyData;
  } catch (error) {
    console.error('Error fetching survey data: ', error);
    throw error;
  }
}





