import { useEffect, useState } from "react";
import { LuPlus } from "react-icons/lu"
import { prepareExpenseLineChartData } from "../../utils/helper";
import CustomLineChart from "../Charts/CustomLineChart.jsx";


const ExpenseOverview = ({ transactions, onAddExpense }) => {
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        const result = prepareExpenseLineChartData(transactions);
        setChartData(result);
        return () => {};
    }, [transactions]);


    return (
        <div className="card">
            <div className="flex justify-between items-center">
                <div className="">
                    <h5 className="text-lg font-semibold underline">
                        Expense Overview
                    </h5>

                    <p className="text-xs text-gray-400 mt-0.5">
                        Track your sending trends over time and gain insights into your spending habits.
                    </p>
                </div>
                <button className="add-btn" onClick={onAddExpense}>
                    <LuPlus className="text-lg"/>
                    Add Expense</button>
            </div>

            <div className="mt-10">
                <CustomLineChart
                    data={chartData}
                />  
            </div>
        </div>
    )
}

export default ExpenseOverview