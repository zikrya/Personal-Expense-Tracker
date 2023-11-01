import { firestore } from '../../utils/firebase-config';
import { doc, getDoc } from 'firebase/firestore';
// due to this code requiring an async function, I had to install some babel/updates based on these instructions:
// https://stackoverflow.com/questions/58613492/how-to-resolve-cannot-use-import-statement-outside-a-module-from-jest-when-run
// which had to make me remove "type": "module" from my package.json, and switch the way i'm importing and exporting functions.

export function getProfile(UID) {
    // Fetching the profile data from Firestore when the component mounts
    let boolReturned = 0;
    const fetchData = async () => {
        const docRef = doc(firestore, "users", UID);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            // console.log(docSnap.data());
            boolReturned = 0;
        } else {
            //console.log("No such document!");
            boolReturned = 1;
        }
    };
    fetchData();
    return boolReturned;
}