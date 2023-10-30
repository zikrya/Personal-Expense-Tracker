import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useProtectedRoute } from "../components/useProtectedRoute";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import AddTransactionForm from "./AddTransactionForm";



const TransTable = () => {
    useProtectedRoute();
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();
    const handleLogout = async () => {
        try {
            await logout(navigate("/"));
        } catch (err) {
            console.error("Error logging out:", err);
        }
    };

    const [transactionList, setTransactionList] = useState([]);
    const [newDescription,setNewDescription] = useState('')
    const [newAmount, setAmount] = useState(0)

    const addTransactions = (newDescription,newAmount) => {
        const currentDate = new Date().toLocaleDateString();
        const newTransaction = {date : currentDate, description : newDescription, amount: newAmount }
        setTransactionList([newTransaction,...transactionList])
        setNewDescription("")
        setAmount(0)
    }

    const handleSubmit = (e) => {
        e.preventDefault(); 
        setFormVisible(false);
        addTransactions(newDescription,newAmount);
      }

 const [isFormVisible, setFormVisible] = useState(false);

  const openForm = () => {
    setFormVisible(true);
  };

  const closeForm = () => {
    setFormVisible(false);
  };


    return (
        <><div className="px-8 pt-8 grid grid-cols-4 gap-5">
            <div>
                {/* From Flowbite, data cards */}
                <a href="#" className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-darkblue dark:text-white">$ 1,000</h5>
                    <p className="font-normal text-gray-700 dark:text-gray-400">Income</p>
                </a>
            </div>
            <div>
                <a href="#" className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-darkblue dark:text-white">$ 300</h5>
                    <p className="font-normal text-gray-700 dark:text-gray-400">Budget Spent</p>
                </a>
            </div>
            <div>
                <a href="#" className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-darkblue dark:text-white">$ 100</h5>
                    <p className="font-normal text-gray-700 dark:text-gray-400">Budget Savings</p>
                </a>
            </div>
            <div>
                <a href="#" className="h-36 block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-darkblue dark:text-white">$ 400</h5>
                    {/* Flowbite Progress Bar */}
                    <div className="flex justify-between mb-1">
                        <span className="text-base font-normal text-gray-700 dark:text-gray-400">Total Savings</span>
                        <span className="text-sm font-medium text-darkblue dark:text-white">80%</span>
                    </div>
                    <div className="w-full bg-lightblue rounded-full h-2.5 dark:bg-gray-900">
                        <div className="bg-darkblue h-2.5 rounded-full dark:bg-green w-4/5"></div>
                    </div>
                    <p className="mt-1 text-right italic font-normal text-gray-400 dark:text-gray-400">$100 to goal!</p>

                </a>
            </div>
        </div><div className="px-8 py-0 w-full overflow-x-auto">
                <div className="mb-4 text-2xl font-semibold text-darkblue">Recent Activity</div>
                <div className="grid grid-cols-4 gap-5">
                    <table className="w-full col-span-3 border-collapse table-auto bg-white rounded-lg shadow">
                        <thead>
                            <tr>
                                <th className="border p-3 bg-gray-100 text-left">Date</th>
                                <th className="border p-3 bg-gray-100 text-left">Category</th>
                                <th className="border p-3 bg-gray-100 text-right">Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactionList.map((transaction, index) => (
                                <tr
                                    key={index}
                                    className="transition-colors hover:bg-gray-50"
                                >
                                    <td className="border p-3">{transaction.date}</td>
                                    <td className="border p-3">{transaction.description}</td>
                                    <td className="border p-3 text-green font-semibold text-right">
                                        ${parseFloat(transaction.amount).toFixed(2)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <button className="text-base h-1/4 py-2 font-normal rounded-lg bg-darkblue text-lightblue hover:bg-black" onClick={openForm}>
                        Add Transaction
                    </button>

                    {isFormVisible && 
                        <AddTransactionForm 
                        description ={newDescription}
                        Amount = {newAmount}
                        setDescription ={setNewDescription}
                        setAmount ={setAmount}
                        handleSubmit ={handleSubmit}
                        closeForm ={closeForm}
                        />}

                </div>
            </div></>
    );
}

export default TransTable;