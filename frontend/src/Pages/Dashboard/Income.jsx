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
import DeleteAlert from "../../Components/Income/DeleteAlert.jsx"
import DownloadExcelForm from "../../Components/Income/DownloadExcelForm.jsx"


const Income = () => {
  useUserAuth();

  const [openAddIncome, setOpenAddIncome] = useState(false)
  const [incomeData, setIncomeData] = useState([]);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  })

  const [downloadIncomeModal, setDownloadIncomeModal] = useState(false);

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
    try{
      await axiosInstance.delete(`${API_PATHS.INCOME.DELETE(id)}`);
      setOpenDeleteAlert({ show: false, data: null });
      toast.success("Income deleted successfully");
      fetchIncomeDetails();
    } catch (error) {
      toast.error("Failed to delete income!");
    }
  }

  const handleDownloadIncomeDetails = async (month) => {
    if (!month) {
      toast.error("Please select a month to download income details.");
      return;
    }
    const currentMonth = new Date().toISOString().slice(0, 7)
    if (month > currentMonth) {
      toast.error("Select a valid month.");
      return;
    }
    try {
      const response = await axiosInstance.get(API_PATHS.INCOME.DOWNLOAD_EXCEL(month),{
        responseType: 'blob',
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `income_details_${month}.xlsx`);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
      setDownloadIncomeModal(false);
      toast.success("Income details downloaded successfully");
    } catch (error) {
      toast.error("Failed to download income details!");
    }
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
            onDownload={()=>setDownloadIncomeModal(true)}
          />

        </div>
        <Modal
          isOpen={openAddIncome}
          onClose={() => setOpenAddIncome(false)}
          title="Add Income"
        >
          <AddInComeForm onAddIncome={handleAddIncome} />
        </Modal>
        
        <Modal
          isOpen={openDeleteAlert.show}
          onClose={() => setOpenDeleteAlert({ show: false, data: null })}
          title="Delete Income"
          >
            <DeleteAlert
              onDelete={()=>deleteIncome(openDeleteAlert.data)}
              content="Are you sure you want to delete this income?"
            />
          </Modal>
        <Modal
          isOpen={downloadIncomeModal}
          onClose={() => setDownloadIncomeModal(false)}
          title="Download Income Details"
        >
          <DownloadExcelForm
            onDownload={(month)=>handleDownloadIncomeDetails(month)}
            content = "Enter the month for which you want to download income details."
          />
        </Modal>
      </div>
    </DashboardLayout>
  )
}

export default Income