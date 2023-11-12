import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useProtectedRoute } from '../components/useProtectedRoute';
import { saveSurveyData, getUserName } from '../utils/firebase-config';
import { useAuth } from "../context/AuthContext";

const RegisterSurvey = () => {
    useProtectedRoute();

    const navigate = useNavigate();
    const { currentUser } = useAuth();
    const [firstName, setfirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [college, setCollege] = useState('');
    const [graduationDate, setGraduationDate] = useState('');
    const [major, setMajor] = useState('');
    const [housingSituation, setHousingSituation] = useState('');
    const [sourceOfIncome, setSourceOfIncome] = useState([]);
    const [monthlyIncome, setMonthlyIncome] = useState('');
    const [moneySaved, setMoneySaved] = useState('');
    const [savingsGoal, setSavingsGoal] = useState('');
    const [budgetCategories, setBudgetCategories] = useState([]);
    const [totalExpenses, setTotalExpenses] = useState('');
    const [maximumBudget, setMaximumBudget] = useState('');
    const [notificationPreferences, setNotificationPreferences] = useState('');
    const [notificationMethod, setNotificationMethod] = useState(false);
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

    const handleMultiSelectChange = (e, setterFunction) => {
        const options = e.target.options;
        const selectedOptions = [];
        for (let i = 0; i < options.length; i++) {
            if (options[i].selected) {
                selectedOptions.push(options[i].value);
            }
        }
        setterFunction(selectedOptions);
    };

    const handleCheckboxChange = (e, setterFunction, value) => {
        if (e.target.checked) {
            setterFunction(prev => [...prev, value]);
        } else {
            setterFunction(prev => prev.filter(item => item !== value));
        }
    };

    if (hasCompletedSurvey) {
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-500 to-indigo-500">
            <p className="text-white">You have already completed the survey. Thank you!</p>
        </div>
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const surveyData = {
            userId: currentUser.uid,
            firstName: firstName,
            lastName: lastName,
            college: college,
            graduationDate: graduationDate,
            major: major,
            housingSituation: housingSituation,
            sourceOfIncome: sourceOfIncome,
            monthlyIncome: monthlyIncome,
            moneySaved: moneySaved,
            savingsGoal: savingsGoal,
            budgetCategories: budgetCategories,
            totalExpenses: totalExpenses,
            maximumBudget: maximumBudget,
            notificationPreferences: notificationPreferences,
            notificationMethod: notificationMethod
        };

        try {
            const docId = await saveSurveyData(surveyData);
            console.log("Document written with ID: ", docId);

            //   if (currentUser) {
            //     await markSurveyAsCompleted(currentUser.uid);
            //     setHasCompletedSurvey(true);
            //   }

            navigate('/transtable');
        } catch (error) {
            console.error("Error adding document: ", error);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-custom-gradient pt-10 pb-10">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md max-w-lg w-full">
                <label htmlFor="fname">First Name:</label><br />
                <input
                    type="text"
                    id="fname"
                    name="fname"
                    value={firstName}
                    onChange={(e) => setfirstName(e.target.value)}
                    className="mt-1 p-2 w-full border rounded-md mb-4"
                />
                <br />
                <label htmlFor="fname">Last Name:</label><br />
                <input
                    type="text"
                    id="fname"
                    name="fname"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="mt-1 p-2 w-full border rounded-md mb-4"
                />
                <br />
                <label htmlFor='college'>College/University</label><br />
                <input
                    type="text"
                    id="college"
                    name="college"
                    value={college}
                    onChange={(e) => setCollege(e.target.value)}
                    className="mt-1 p-2 w-full border rounded-md mb-4"
                />
                <br />
                <label htmlFor="graduationDate">Expected Graduation Date:</label><br />
                <input
                    type="date"
                    id="graduationDate"
                    name="graduationDate"
                    value={graduationDate}
                    onChange={(e) => setGraduationDate(e.target.value)}
                    className="mt-1 p-2 w-full border rounded-md mb-4"
                />
                <br />
                <label htmlFor="major">Major / Field of Study:</label><br />
                <input
                    type="text"
                    id="major"
                    name="major"
                    value={major}
                    onChange={(e) => setMajor(e.target.value)}
                    className="mt-1 p-2 w-full border rounded-md mb-4"
                />
                <br />
                <label>Housing Situation:</label><br />
                <select id="housing" name="housing" onChange={(e) => setHousingSituation(e.target.value)} className="mt-1 p-2 w-full border rounded-md mb-4">
                    <option value="">--Please choose an option--</option>
                    <option value="On-campus">On-campus</option>
                    <option value="Off-campus">Off-campus</option>
                    <option value="Living at home">Living at home</option>
                    <option value="Other">Other</option>
                </select>
                <br />
                <label>Source of Income: (Select all that apply)</label><br />
                <div className="flex flex-col">
                    {['Part-time job', 'Full-time job', 'Parental support', 'Scholarships', 'Loans', 'Savings', 'Other'].map((source) => (
                        <label key={source} className="inline-flex items-center mt-3">
                            <input
                                type="checkbox"
                                value={source}
                                checked={sourceOfIncome.includes(source)}
                                onChange={(e) => handleCheckboxChange(e, setSourceOfIncome, source)}
                                className="rounded"
                            />
                            <span className="ml-2">{source}</span>
                        </label>
                    ))}
                </div>

                <br />
                <label htmlFor="monthlyIncome">What is your estimated monthly income?</label><br />
                <input
                    type="number"
                    id="monthlyIncome"
                    name="monthlyIncome"
                    value={monthlyIncome}
                    onChange={(e) => setMonthlyIncome(e.target.value)}
                    className="mt-1 p-2 w-full border rounded-md mb-4"
                />
                <br />
                <label htmlFor="moneySaved">How much money do you currently have saved?</label><br />
                <input
                    type="number"
                    id="moneySaved"
                    name="moneySaved"
                    value={moneySaved}
                    onChange={(e) => setMoneySaved(e.target.value)}
                    className="mt-1 p-2 w-full border rounded-md mb-4"
                />
                <br />
                <label htmlFor="savingsGoal">How much more do you want to save</label><br />
                <input
                    type="number"
                    id="savingsGoal"
                    name="savingsGoal"
                    value={savingsGoal}
                    onChange={(e) => setSavingsGoal(e.target.value)}
                    className="mt-1 p-2 w-full border rounded-md mb-4"
                />
                <br />
                <label>Which of the following categories do you spend money on regularly? (Select all that apply)</label><br />
                <div className="flex flex-col">
                    {['Rent/Mortgage', 'Utilities', 'Groceries', 'Dining Out', 'Entertainment', 'Transportation', 'Education Supplies', 'Insurance', 'Other'].map((category) => (
                        <label key={category} className="inline-flex items-center mt-3">
                            <input
                                type="checkbox"
                                value={category}
                                checked={budgetCategories.includes(category)}
                                onChange={(e) => handleCheckboxChange(e, setBudgetCategories, category)}
                                className="rounded"
                            />
                            <span className="ml-2">{category}</span>
                        </label>
                    ))}
                </div>

                <br />
                <label htmlFor="totalExpenses">What is your total monthly expense?</label><br />
                <input
                    type="number"
                    id="totalExpenses"
                    name="totalExpenses"
                    value={totalExpenses}
                    onChange={(e) => setTotalExpenses(e.target.value)}
                    className="mt-1 p-2 w-full border rounded-md mb-4"
                />
                <br />
                <label htmlFor="maximumBudget">What is the maximum amount you can spend in a month?</label><br />
                <input
                    type="number"
                    id="maximumBudget"
                    name="maximumBudget"
                    value={maximumBudget}
                    onChange={(e) => setMaximumBudget(e.target.value)}
                    className="mt-1 p-2 w-full border rounded-md mb-4"
                />
                <br />
                <label>Notification Preferences:</label><br />
                <select id="notifications" name="notifications" onChange={(e) => setNotificationPreferences(e.target.value)} className="mt-1 p-2 w-full border rounded-md mb-4">
                    <option value="">--Please choose an option--</option>
                    <option value="Daily">Daily</option>
                    <option value="Weekly">Weekly</option>
                    <option value="Monthly">Monthly</option>
                    <option value="Only when I'm nearing my budget limit">Only when I'm nearing my budget limit</option>
                    <option value="Never">Never</option>
                </select>
                <br />
                <label>Notification Method</label><br />
                <select id="notifications" name="notifications" onChange={(e) => setNotificationMethod(e.target.value)} className="mt-1 p-2 w-full border rounded-md mb-4">
                    <option value="">--Please choose an option--</option>
                    <option value="Email">Email</option>
                    <option value="Phone">Phone</option>
                    <option value="Both">Both</option>
                    <option value="None">None</option>
                </select>
                <br />
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4">Submit</button>
            </form>
        </div>
    );
}

export default RegisterSurvey;
