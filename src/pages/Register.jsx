import { useContext } from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
const Register = () => {
    const navigate = useNavigate();

    const { register } = useAuth()

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');
    
    const [monthlyIncome, setMonthlyIncome] = useState("");
    const [monthlySavings, setMonthlySavings] = useState("");
    const [topExpenses, setTopExpenses] = useState("");
    const [startingBudget, setStartingBudget] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');

        try {
            await register(email, password);
            navigate("/"); // Navigate to the home page or desired page after successful registration
        } catch (err) {
            setError(err.message);
        } finally {
            setIsSubmitting(false);
        }
    }
    return (
        <section className="bg-custom-gradient flex items-center justify-center h-screen font-custom">
            <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
                <h1 className="mb-4 text-2xl font-bold text-gray-900 text-center">
                    Register
                </h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">Your email</label>
                        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" name="email" id="email" className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="name@company.com" required=""/>
                    </div>
                    <div>
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-700">Password</label>
                        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" name="password" id="password" className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="••••••••" required=""/>
                    </div>
                    <div>
                        <label htmlFor="monthlyIncome" className="block mb-2 text-sm font-medium text-gray-700">Estimated Monthly Income</label>
                        <input value={monthlyIncome} onChange={(e) => setMonthlyIncome(e.target.value)} type="number" name="monthlyIncome" id="monthlyIncome" className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="e.g., 5000" required=""/>
                    </div>

                    <div>
                        <label htmlFor="monthlySavings" className="block mb-2 text-sm font-medium text-gray-700">How much do you want to save each month?</label>
                        <input value={monthlySavings} onChange={(e) => setMonthlySavings(e.target.value)} type="number" name="monthlySavings" id="monthlySavings" className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="e.g., 500" required=""/>
                    </div>

                    <div>
                        <label htmlFor="topExpenses" className="block mb-2 text-sm font-medium text-gray-700">What 3 things would you say you spend the most on?</label>
                        <input value={topExpenses} onChange={(e) => setTopExpenses(e.target.value)} type="text" name="topExpenses" id="topExpenses" className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="e.g., Rent, Groceries, Entertainment" required=""/>
                    </div>

                    <div>
                        <label htmlFor="startingBudget" className="block mb-2 text-sm font-medium text-gray-700">What is your starting budget for this month?</label>
                        <input value={startingBudget} onChange={(e) => setStartingBudget(e.target.value)} type="number" name="startingBudget" id="startingBudget" className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="e.g., 4500" required=""/>
                    </div>
                    {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
                    <div>
                        <button type="submit" disabled={isSubmitting} className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50">{isSubmitting ? "Registering..." : "Register"}</button>
                    </div>
                </form>
            </div>
        </section>
    );
}

export default Register;