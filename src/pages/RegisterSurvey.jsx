import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useProtectedRoute } from '../components/useProtectedRoute';
import { saveSurveyData, markSurveyAsCompleted, getUserName } from '../utils/firebase-config';
import { useAuth } from "../context/AuthContext";

const RegisterSurvey = () => {
    useProtectedRoute();

    const navigate = useNavigate();
    const { currentUser } = useAuth();
    const [fullName, setFullName] = useState('');
    const [college, setCollege] = useState('');
    const [hasCompletedSurvey, setHasCompletedSurvey] = useState(false);

    useEffect(() => {
        async function checkIfSurveyCompleted() {
            if (currentUser) {
                const completedSurvey = await getUserName(currentUser.uid);
                setHasCompletedSurvey(!!completedSurvey);
            }
        }

        checkIfSurveyCompleted();
    }, [currentUser]);

    if (hasCompletedSurvey) {
        return <p>You have already completed the survey. Thank you!</p>
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const surveyData = {
            fullName: fullName,
            college: college,
        };

        try {
            const docId = await saveSurveyData(surveyData);
            console.log("Document written with ID: ", docId);

           /* if (currentUser) {
                await markSurveyAsCompleted(currentUser.uid);
                setHasCompletedSurvey(true);
            } */

            navigate('/transtable');
        } catch (error) {
            console.error("Error adding document: ", error);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <label htmlFor="fname">Full Name:</label><br />
                <input
                    type="text"
                    id="fname"
                    name="fname"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                />
                <br />
                <label htmlFor='college'>College/University</label><br />
                <input
                    type="text"
                    id="college"
                    name="college"
                    value={college}
                    onChange={(e) => setCollege(e.target.value)}
                />
                <br />
                <button type="submit">Submit</button>
            </form>
            <button onClick={() => navigate('/transtable')}>Test Navigate</button>
        </>
    );
}

export default RegisterSurvey;




