import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React from 'react';
import { useState, useEffect } from 'react';

function Notification() {
    // const notify = () => toast("This is a toast notification !");
    const notify = () => toast("This is a toast notification !");
    return (
        <div>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={notify}>Notify !</button>
        <ToastContainer autoClose={2000} />
      </div>
    )

}

export default Notification;