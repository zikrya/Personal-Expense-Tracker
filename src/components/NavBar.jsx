import React from 'react'
import { useNavigate } from "react-router-dom";
import { NavLink } from 'react-router-dom';
import { useAuth } from "../context/AuthContext";

const NavBar = () => {
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();
    const handleLogout = async () => {
      try {
          await logout();
          navigate("/");
      } catch (err) {
          console.error("Error logging out:", err);
      }
  };
  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <NavLink to="/" className="flex items-center">
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Wise Wallet</span>
        </NavLink>

        <div className="w-full md:block md:w-auto" id="navbar-default">
          <ul className = "font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            {!currentUser && 
            <li>
                <NavLink to="/login" className = "block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Login</NavLink>
            </li>}
            {!currentUser && 
            <li>
                <NavLink to="/register" className = "block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Register</NavLink>
            </li>}
            {currentUser && 
            <li>
                <NavLink to="/transtable" className = "block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Dashboard</NavLink>
            </li>}
            {currentUser &&
            <button
              onClick={handleLogout}
              className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
              Log Out
            </button>
            }
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default NavBar
