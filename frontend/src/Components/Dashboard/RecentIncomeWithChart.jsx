import { useEffect, useState } from 'react';
import CustomPieChart from '../Charts/CustomPieChart';

const COLORS = ["#875CF5", "#FA2C37", "#FF6900"];

const RecentIncomeWithChart = ({  data, totalIncome }) => {

    const [ chartData, setChartData ] = useState([]);
    const prepareChart = () =>{
        const dataArr = data?.map((item)=>({
            name:item?.source,
            amount:item?.amount,
        }));

        setChartData(dataArr);
    };

    useEffect(()=>{
        prepareChart();
        return()=>{};
    },[data]);

    return (
        <div className="card">
            <div className="flex items-center justify-between">
                <h5 className="text-lg underline font-semibold">Last 60 Days Income</h5>
            </div>
            <CustomPieChart
                data={chartData}
                label="Total Income"
                totalAmount={`₹ ${totalIncome}`}
                showTextAnchor
                colors={COLORS}
            />
        </div>
    )
}

export default RecentIncomeWithChart