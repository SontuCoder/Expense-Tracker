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

const Home = () => {
  useUserAuth();

  const navigate = useNavigate();
  const [ dasboardData, setDashboardData ] = useState(null);
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
          value = {addThousandsSeparator(dasboardData?.totalBalance || 0)}
          color = "bg-primary"
          />

          <InfoCard
          icon = {<LuWalletMinimal/>}
          label = "Total Income"
          value = {addThousandsSeparator(dasboardData?.totalIncome || 0)}
          color = "bg-orange-500"
          />
          <InfoCard
          icon = {<LuHandCoins/>}
          label = "Total Expense"
          value = {addThousandsSeparator(dasboardData?.totalExpense || 0)}
          color = "bg-red-500"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <RecentTransactions
              trasactions={dasboardData?.recetTransactions}
              onSeeMore = {()=> navigate("/expense")}
          />
          
        </div>
      </div>
    </DashboardLayout>
  )
}

export default Home