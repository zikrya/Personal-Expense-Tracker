import React from 'react'
import { NavLink } from 'react-router-dom';
import { useAuth } from "../context/AuthContext";

const NavBar = () => {
    const { currentUser } = useAuth();
  return (
    <nav className = "bg-neutral-800 text-white flex justify-between py-0 px-2 items-center">
        <NavLink to="/" className="text-4xl">BrandName</NavLink>
        <ul className = "gap-3 flex p-0 m-0 list-none">
            {!currentUser && 
            <li className = "hover:bg-neutral-600">
                <NavLink to="/login">login</NavLink>
            </li>}
            {!currentUser && 
            <li className = "hover:bg-neutral-600">
            <NavLink to="/register">register</NavLink>
            </li>}
            
        </ul>
    </nav>
  )
}

export default NavBar
