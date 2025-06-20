import { useEffect, useState } from "react";
import { prepareExpenseBarChartData } from "../../utils/helper.js";
import CustomBarCart from "../Charts/CustomBarCart.jsx";

const Last30DaysExpense = ( { data }) => {
    const [ chartData, setChartData ] = useState([]);

    useEffect(()=>{
        const result = prepareExpenseBarChartData(data);
        setChartData(result);
        return ()=>{}
    },[data]);

    return (
        <div className="card col-span-1">
            <div className="flex items-center justify-between">
                <h5 className="text-lg underline font-semibold">Last 30 Days Expenses</h5>
            </div>
            <CustomBarCart data ={chartData}/>
        </div>
    )
}

export default Last30DaysExpense