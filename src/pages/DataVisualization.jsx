import PieChart from "../components/PieChart";
import LineChart from "../components/LineChart";
import AreaChart from "../components/AreaChart";

const DataVis = () => {
    return (
        <div>
            <div className="grid grid-cols-3 place-items-center">
                <div className="col-span-2"><LineChart /></div>
                <div><AreaChart /></div>
                <div><PieChart /></div>
            </div>
        </div>
    );
}

export default DataVis;
