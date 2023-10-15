import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const transactions = [
    { date: '2023-10-14', description: 'Utilities', amount: 50.0 },
    { date: '2023-10-15', description: 'Clothing', amount: 120.0 },
    { date: '2023-10-13', description: 'Restaurant', amount: 50.0 },
    // Add more transactions
  ];
  
  // Sort the transactions by date in ascending order
  transactions.sort((a, b) => new Date(b.date) - new Date(a.date));
  

const TransTable = () => {
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();
    const handleLogout = async () => {
        try {
            await logout(navigate("/"));
        } catch (err) {
            console.error("Error logging out:", err);
        }
    };
    return (
    
    <div className="p-8 w-full overflow-x-auto">
      <div className="mb-4 text-2xl font-semibold text-gray-800">Recent Activity</div>
      <div className="grid grid-cols-4">
      <table className="w-full col-span-3 border-collapse table-auto bg-white rounded-lg shadow">
        <thead>
          <tr>
            <th className="border p-3 bg-gray-100 text-left">Date</th>
            <th className="border p-3 bg-gray-100 text-left">Category</th>
            <th className="border p-3 bg-gray-100 text-right">Amount</th>
          </tr>
        </thead>
      <tbody>
        {transactions.map((transaction, index) => (
          <tr
            key={index}
            className="transition-colors hover:bg-gray-50"
          >
            <td className="border p-3">{transaction.date}</td>
            <td className="border p-3">{transaction.description}</td>
            <td className="border p-3 text-green-600 font-semibold text-right">
              ${transaction.amount.toFixed(2)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    <button className="ml-4 px-4 py-2 rounded-md bg-emerald-200 text-white hover:bg-emerald-300">
          Add Transaction
        </button>
  </div>
  </div>
  );
}

export default TransTable;