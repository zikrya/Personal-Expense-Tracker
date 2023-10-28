import React, { useState } from 'react';
import { saveSurveyData } from '../utils/firebase-config';

const RegisterSurvery = () => {
    const [fullName, setFullName] = useState('');
    const [college, setCollege] = useState('');
    /// Every New input field, create a new identical useState

    const handleSubmit = async (e) => {
        e.preventDefault();

        const surveyData = {
            fullName: fullName,
            college: college, // Then add it here
        };

        try {
            const docId = await saveSurveyData(surveyData);
            console.log("Document written with ID: ", docId);
        } catch (error) {
            console.error("Error adding document: ", error);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <label htmlFor="fname">Full Name:</label><br/>
                <input
                    type="text"
                    id="fname"
                    name="fname"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                />
                <br />
                <label htmlFor='college'>College/University</label><br/>
                <input
                    type="text"
                    id="college"
                    name="fname"
                    value={college}
                    onChange={(e) => setCollege(e.target.value)}
                />
                <br />
                <button type="submit">Submit</button>
            </form>
        </>
    );
}

export default RegisterSurvery;
