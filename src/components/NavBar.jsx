import React from 'react'
import { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { useNavigate } from "react-router-dom";
import { NavLink } from 'react-router-dom';
import { useAuth } from "../context/AuthContext";

function MobileNavLink({ to, children }) {
  return (
    <Popover.Button as={NavLink} to={to} className="block w-full p-2">
      {children}
    </Popover.Button>
  )
}
function MobileNavIcon({ open }) {
  return (
    <svg
      aria-hidden="true"
      className="h-3.5 w-3.5 overflow-visible stroke-slate-700"
      fill="none"
      strokeWidth={2}
      strokeLinecap="round"
    >
      <path
        d="M0 1H14M0 7H14M0 13H14"
        className={
          'origin-center transition' + 
          (open && 'scale-90 opacity-0')
        }
      />
      <path
        d="M2 2L12 12M12 2L2 12"
        className={
          'origin-center transition' + 
          (!open && 'scale-90 opacity-0')}
      />
    </svg>
  )
}

function MobileNavigation() {
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
    <Popover>
      <Popover.Button
        className="relative z-10 flex h-8 w-8 items-center justify-center ui-not-focus-visible:outline-none"
        aria-label="Toggle Navigation"
      >
        {({ open }) => <MobileNavIcon open={open} />}
      </Popover.Button>
      <Transition.Root>
        <Transition.Child
          as={Fragment}
          enter="duration-150 ease-out"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="duration-150 ease-in"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Popover.Overlay className="fixed inset-0 bg-slate-300/50" />
        </Transition.Child>
        <Transition.Child
          as={Fragment}
          enter="duration-150 ease-out"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="duration-100 ease-in"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          {!currentUser ? 
            (<Popover.Panel
              as="div"
              className="absolute inset-x-0 top-full mt-4 flex origin-top flex-col rounded-2xl bg-white p-4 text-lg tracking-tight text-slate-900 shadow-xl ring-1 ring-slate-900/5"
            >
              <MobileNavLink to="/register">Sign up</MobileNavLink>
              <hr className="m-2 border-slate-300/40" />
              <MobileNavLink to="/login">Sign in</MobileNavLink>
            </Popover.Panel>)
              :
            (<Popover.Panel
              as="div"
              className="absolute inset-x-0 top-full mt-4 flex origin-top flex-col rounded-2xl bg-white p-4 text-lg tracking-tight text-slate-900 shadow-xl ring-1 ring-slate-900/5"
            >
              <MobileNavLink to="/transtable">Dashboard</MobileNavLink>
              <MobileNavLink to="/profile">Profile</MobileNavLink>
              <hr className="m-2 border-slate-300/40" />
              <button className="block w-full p-2" onClick={handleLogout}>Log out</button>
            </Popover.Panel>)
          }
        </Transition.Child>
      </Transition.Root>
    </Popover>
  )
}

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
  /*return (
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
            <li>
                <NavLink to="/profile" className = "block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Profile</NavLink>
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
  )*/
  return(
    <header className="py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <nav className="relative z-50 flex justify-between">
          <div className = "flex items-center md:gap-x-12">
            <NavLink to="/" className="text-2xl font-semibold whitespace-nowrap">Wise Wallet</NavLink>
          </div>
          <div className="flex items-center gap-x-5 md:gap-x-8">
              {!currentUser ? (
              <div className="hidden md:flex md:gap-x-6">
                <NavLink to="/login">Sign in</NavLink>
                <NavLink to="/register">Sign up</NavLink>
              </div>) :
              (
              <div className="hidden md:flex md:gap-x-6">
                <NavLink to="/transtable">Dashboard</NavLink>
                <NavLink to="/profile">Profile</NavLink>
                <button onClick={handleLogout}>Log out</button>
              </div>
              )}
              <div className="-mr-1 md:hidden">
                <MobileNavigation />
              </div>
          </div>
        </nav>
      </div>
    </header>
  )
}

export default NavBar
