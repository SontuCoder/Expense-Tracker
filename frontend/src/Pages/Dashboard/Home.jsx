import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../Components/layouts/DashboardLayout"
import { useUserAuth } from "../../Hooks/useUserAuth.jsx"
import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import toast from "react-hot-toast";
import InfoCard from "../../Components/Cards/InfoCard.jsx";
import { LuHandCoins, LuWalletMinimal } from "react-icons/lu";
import { IoMdCard } from "react-icons/io";
import { addThousandsSeparator } from "../../utils/helper.js";
import RecentTransactions from "../../Components/Dashboard/RecentTransactions.jsx";
import FinanceOverview from "../../Components/Dashboard/FinanceOverview.jsx";
import ExpenseTransactions from "../../Components/Dashboard/ExpenseTransactions.jsx";
import Last30DaysExpense from "../../Components/Dashboard/last30DaysExpense.jsx";
import RecentIncomeWithChart from "../../Components/Dashboard/RecentIncomeWithChart.jsx";
import RecentIncome from "../../Components/Dashboard/RecentIncome.jsx";

const Home = () => {
  useUserAuth();

  const navigate = useNavigate();
  const [ dashboardData, setDashboardData ] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchDashboardData = async ()=>{
    if(loading) return;
    setLoading(true);
    try{
      const response = await axiosInstance.get(`${API_PATHS.DASHBOARD.GET_DATA}`);
      if(response.data){
        setDashboardData(response.data);
      }
    }catch (error){
      toast.error("Dashboard load failed.")
    } finally {
      setLoading(false);
    }
  }
  useEffect(()=>{
    fetchDashboardData();
    return ()=>{
    }
  },[])

  return (
    <DashboardLayout activeMenu = "Dashboard">
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <InfoCard
          icon = {<IoMdCard/>}
          label = "Total Balance"
          value = {addThousandsSeparator(dashboardData?.totalBalance || 0)}
          color = "bg-primary"
          />

          <InfoCard
          icon = {<LuWalletMinimal/>}
          label = "Total Income"
          value = {addThousandsSeparator(dashboardData?.totalIncome || 0)}
          color = "bg-orange-500"
          />
          <InfoCard
          icon = {<LuHandCoins/>}
          label = "Total Expense"
          value = {addThousandsSeparator(dashboardData?.totalExpense || 0)}
          color = "bg-red-500"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <RecentTransactions
              trasactions={dashboardData?.recentTransactions}
              onSeeMore = {()=> navigate("/expense")}
          />
          
          <FinanceOverview 
              totalBalance = {dashboardData?.totalBalance || 0}
              totalIncome = {dashboardData?.totalIncome || 0}
              totalExpense = {dashboardData?.totalExpense || 0}
          />

          <ExpenseTransactions
              trasactions = {dashboardData?.last30DaysExpense?.transactions || []}
              onSeeMore = {()=> navigate("/expense")}
            />

            <Last30DaysExpense data={dashboardData?.last30DaysExpense?.transactions || []} />

            <RecentIncomeWithChart
              data={dashboardData?.last60DaysIncome?.transactions?.slice(0,4) || []}
              totalIncome = {dashboardData?.totalIncome || 0}
            />

            <RecentIncome
                transactions = {dashboardData?.last60DaysIncome?.transactions || []}
                onSeeMore = {()=>navigate("/income")}
            />
        </div>

      </div>
    </DashboardLayout>
  )
}

export default Home