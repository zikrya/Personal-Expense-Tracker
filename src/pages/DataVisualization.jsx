//import { useProtectedRoute } from "../components/useProtectedRoute";
import { useState,useEffect } from "react";
import PieChart from "../components/PieChart";
import LineChart from "../components/LineChart";
import AreaChart from "../components/AreaChart";
import { useAuth } from "../context/AuthContext";
import {getTransactionFromDB } from '../utils/firebase-config';
import {getSurveyDB} from '../utils/firebase-config';


const DataVis = () => {
    //useProtectedRoute();
    const { currentUser} = useAuth();
    
    useEffect(() => {fetchTransactions()},[currentUser])
    
    async function fetchTransactions() {
        if(currentUser){
            const data = await getTransactionFromDB(currentUser.uid);
            const surveyData = await getSurveyDB(currentUser.uid);
            setTransactionList(data);
            setSurvey(surveyData);
        }
      }
    return (
        <div>
            <div className="grid grid-cols-3 place-items-center gap-y-4">
                <div className="col-span-2"><LineChart /></div>
                <div><AreaChart /></div>
                <div><PieChart /></div>
            </div>
        </div>
    );
}

export default DataVis;
