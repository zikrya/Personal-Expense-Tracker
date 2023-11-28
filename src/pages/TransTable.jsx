import { useProtectedRoute } from "../components/useProtectedRoute";
import { useState,useEffect } from "react";
import AddTransactionForm from "./AddTransactionForm";
import { useAuth } from "../context/AuthContext";
import {TrashIcon} from '@heroicons/react/20/solid'
import {getTransactionFromDB } from '../utils/firebase-config';
import DeleteConfirm from "./DeleteConfirm";

const TransTable = () => {
    useProtectedRoute();
    const { currentUser} = useAuth();

    useEffect(() => {fetchTransactions()},[currentUser])

    async function fetchTransactions() {
        if(currentUser){
          const data = await getTransactionFromDB(currentUser.uid);
          setTransactionList(data);
        }
      }

    
    const [showTrashIcon, setShowTrashIcon] = useState(false)

    const [transactionList, setTransactionList] = useState([]);

    const [showConfirmation, setShowConfirmation] = useState(false)

    const [deleteID, setDeletID] = useState("")



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
                                <th className="border p-3 bg-gray-100 text-right">

                                {/* feel free to change trash icon color or style */}

                                <button onClick={() => setShowTrashIcon(!showTrashIcon)} className="p-2  border-green-500 rounded-md">
                                <TrashIcon  className="w-5 h-5 text-red-400 hover:text-blue-500 hover:bg-yellow-500" />
                                </button>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactionList.map((transaction) => {
                                const {description,date,amount,id} = transaction;
                                const Date = date.split('T')[0]; 
                                const [year, month, day] = Date.split('-')
                                const formattedDate = `${month}/${day}/${year}`
                                return(
                                <tr
                                    key={id} 
                                    className="transition-colors hover:bg-gray-50"
                                >
                                    <td className="border p-3">{formattedDate}</td>
                                    <td className="border p-3">{description}</td>
                                    <td className="border p-3 text-green font-semibold text-right">
                                        ${parseFloat(amount).toFixed(2)}
                                    </td>
                                    <td className="border p-3" style={{ width: '60px' }}>
                                        {/* feel free to change trash icon color or style */}
                                        {showTrashIcon &&
                                        <button onClick={() => {setShowConfirmation(!showConfirmation); setDeletID(id);}} className="p-2  border-green-500 rounded-md">
                                            <TrashIcon  className="w-5 h-5 text-red-400 hover:text-blue-500 hover:bg-yellow-500" />
                                            {showConfirmation &&
                                                <DeleteConfirm
                                                setTransactionList = {setTransactionList}
                                                id = {deleteID}
                                                setShowConfirmation = {setShowConfirmation}
                                            />}
                                        </button>
                                         }
                                    </td>
                                </tr>
                            )})}
                        </tbody>
                    </table>
                    <AddTransactionForm 
                        fetchTransactions ={fetchTransactions}
                    />
                </div>
            </div></>
    );
}

export default TransTable;