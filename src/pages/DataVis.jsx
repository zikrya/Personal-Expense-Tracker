import LineChart from "../components/LineChart";
import AreaChart from "../components/AreaChart";
import PieChart from "../components/PieChart";

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
            <PieChart/>
        </div>
    </div>
  );
};

export default DataVis;
