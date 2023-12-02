import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../utils/firebase-config";
import { createUserWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getDatabase, ref, get } from "firebase/database";

const checkSurveyCompletion = async (userId) => {
    const checkSurveyCompletion = async (userId) => {
        const database = getDatabase();
        try {
            const surveyRef = ref(database, `users/${userId}/hasCompletedSurvey`);
            const snapshot = await get(surveyRef);
            if (snapshot.exists()) {
                return snapshot.val() === "true"; // Assuming the value is a string "true" when completed
            } else {
                return false; // Survey not completed if there's no data
            }
        } catch (error) {
            console.error("Error checking survey completion: ", error);
            return false; // Assume not completed in case of error
        }
    };
};

const AuthContext = createContext({
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

