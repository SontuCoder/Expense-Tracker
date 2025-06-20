import { useEffect, useState } from "react"
import DashboardLayout from "../../Components/layouts/DashboardLayout.jsx"
import IncomeOverview from "../../Components/Income/IncomeOverview.jsx"
import toast from "react-hot-toast"
import axiosInstance from "../../utils/axiosInstance.js"
import { API_PATHS } from "../../utils/apiPaths.js"
import Modal from "../../Components/Modals/Modal.jsx"
import AddInComeForm from "../../Components/Income/AddInComeForm.jsx"
import IncomeList from "../../Components/Income/IncomeList.jsx"
import { useUserAuth } from "../../Hooks/useUserAuth.jsx"


const Income = () => {
  useUserAuth();

  const [openAddIncome, setOpenAddIncome] = useState(false)
  const [incomeData, setIncomeData] = useState([]);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  })
  const [loading, setLoading] = useState(false);

  const fetchIncomeDetails = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `${API_PATHS.INCOME.GET_ALL}`
      );

      if (response.data) {
        setIncomeData(response.data);
      }

    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const handleAddIncome = async (income) => {
    const { source, amount, date, icon } = income;
    if (!source.trim()) {
      toast.error("Source is required.")
      return;
    }
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      toast.error("Amount is required.");
      return;
    }
    if (!date) {
      toast.error("Date is required.");
      return;
    }

    try {
      await axiosInstance.post(API_PATHS.INCOME.ADD, {
        source,
        amount,
        date,
        icon
      });
      setOpenAddIncome(false);
      toast.success("Income added successfully");
      fetchIncomeDetails();
    } catch (error) {
      toast.error("Error adding income!");
    }
  }

  const deleteIncome = async (id) => {

  }

  const handleDownloadIncomeDetails = async () => {

  }

  useEffect(() => {
    fetchIncomeDetails();
    return () => { };
  }, []);

  return (
    <DashboardLayout activeMenu="Income">
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 gap-6">
          <div className="">
            <IncomeOverview
              transactions={incomeData}
              onAddIncome={() => setOpenAddIncome(true)}
            />
          </div>

          <IncomeList
            transactions={incomeData}
            onDelete={(id) => {
              setOpenDeleteAlert({ show: true, data: id });
            }}
            onDownload={handleDownloadIncomeDetails}
          />

        </div>
        <Modal
          isOpen={openAddIncome}
          onClose={() => setOpenAddIncome(false)}
          title="Add Income"
        >
          <AddInComeForm onAddIncome={handleAddIncome} />
        </Modal>
      </div>
    </DashboardLayout>
  )
}

export default Income