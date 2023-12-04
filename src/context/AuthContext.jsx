/* istanbul ignore file */
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../utils/firebase-config";
import { createUserWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { collection, query, where, getDocs, getFirestore, doc } from 'firebase/firestore'; // Import Firestore functions

const checkSurveyCompletion = async (userId) => {
    const db = getFirestore();
    const collectionRef = collection(db, 'surveys'); 
    try {
        console.log("INSIDE TRY STATEMENT")

        const q = query(collectionRef, where('userId', '==', userId))
        const querySnapshot = await getDocs(q)
        console.log("SURVEY COMPLETED BEFORE")
        return !querySnapshot.empty;
    } catch (error) {
        console.error("Error checking survey completion: ", error);
        return false; // Assume not completed in case of error
    }
};

export const AuthContext = createContext({
    currentUser: null,
    isSurveyCompleted: false,
    register: () => Promise,
    login: () => Promise,
    logout: () => Promise,
    loading: true,
    forgotPassword: () => Promise,
    setIsSurveyCompleted: () => {},
});

export const useAuth = () => useContext(AuthContext);

export default function AuthContextProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isSurveyCompleted, setIsSurveyCompleted] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            setCurrentUser(user);
            setLoading(false);
            if (user) {
                const surveyCompleted = await checkSurveyCompletion(user.uid);
                setIsSurveyCompleted(surveyCompleted);
            } else {
                setIsSurveyCompleted(false); // Reset on logout
            }
        });
        return () => {
            unsubscribe();
        };
    }, []);

    const register = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const login = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    };

    const logout = () => {
        return signOut(auth).then(() => setIsSurveyCompleted(false)); // Reset survey status on logout
    };

    const forgotPassword = (email) => {
        return sendPasswordResetEmail(auth, email, { url: "http://localhost:5175/login" });
    };

    const value = {
        currentUser,
        isSurveyCompleted,
        setIsSurveyCompleted,
        register,
        login,
        logout,
        loading,
        forgotPassword,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

