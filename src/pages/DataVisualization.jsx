import PieChart from "../components/PieChart";
import LineChart from "../components/LineChart";
import AreaChart from "../components/AreaChart";

const DataVis = () => {
    return (
        <div className="flex">
            <div className="flex-1">
                <LineChart />
            </div>
            <div className="flex-1">
                <AreaChart />
            </div>
            <div>
                <PieChart />
            </div>
        </div>
    );
}

export default DataVis;
