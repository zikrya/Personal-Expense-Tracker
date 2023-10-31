import { firestore } from '../../utils/firebase-config';
import { doc, getDoc } from 'firebase/firestore';


export function getProfile(UID) {
    // Fetching the profile data from Firestore when the component mounts
    let boolReturned = 0; 
    const fetchData = async () => {
        const docRef = doc(firestore, "users", UID);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            //console.log(docSnap.data());
            boolReturned = 0;
        } else {
           // console.log("No such document!");
            boolReturned = 1;
        }
    };
    fetchData();
    return boolReturned;
}

