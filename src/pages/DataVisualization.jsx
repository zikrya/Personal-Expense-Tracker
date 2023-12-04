import { useProtectedRoute } from "../components/useProtectedRoute";
import { useState, useEffect } from "react";
import PieChart from "../components/PieChart";
import LineChart from "../components/LineChart";
import AreaChart from "../components/AreaChart";
import { useAuth } from "../context/AuthContext";
import { getTransactionFromDB } from '../utils/firebase-config';
import { getSurveyDB } from '../utils/firebase-config';


const DataVis = () => {
    //useProtectedRoute();
    const { currentUser } = useAuth();

    useEffect(() => { fetchTransactions() }, [currentUser])

    async function fetchTransactions() {
        if (currentUser) {
            const data = await getTransactionFromDB(currentUser.uid);
            const surveyData = await getSurveyDB(currentUser.uid);
            setTransactionList(data);
            setSurvey(surveyData);
        }
    }
    return (
        <div>
            {/* <div className="grid grid-cols-3 place-items-center gap-y-4">
                <div><LineChart /></div>
                <div><AreaChart /></div>
                <div><PieChart /></div>
            </div> */}
            <p className="font-bold text-xl tracking-tight text-darkgreen ml-16 sm:text-2xl md:text-3xl">Your Data Visual Insights</p>

            <div className="mt-6 flex flex-row ml-16">
                <div className="flex-1 basis-1/3 mr-14 h-4/5">
                    <LineChart />  </div>
                <div className="flex-1 basis-1/3 h-4/5">
                    <AreaChart />  </div>
                <div className="flex-1 basis-1/3 h-4/5">
                    <PieChart />
                </div>
            </div>
        </div>
    );
}

export default DataVis;
