import toast from 'react-hot-toast';
import DashboardLayout from '../../Components/layouts/DashboardLayout';
import { useUserAuth } from '../../Hooks/useUserAuth';
import { API_PATHS } from '../../utils/apiPaths';
import axiosInstance from '../../utils/axiosInstance';
import ExpenseOverview from '../../Components/Expense/ExpenseOverview';
import { useEffect, useState } from 'react';
import Modal from '../../Components/Modals/Modal';
import AddExpense from '../../Components/Expense/AddExpense';
import ExpenseList from '../../Components/Expense/ExpenseList';
import DeleteAlert from '../../Components/Income/DeleteAlert';
import DownloadExcelForm from '../../Components/Income/DownloadExcelForm';

const Expense = () => {
  useUserAuth();
  const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false);
  const [expenseData, setExpenseData] = useState([]);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });
  const [loading, setLoading] = useState(false);
  const [downloadExpenseModal, setDownloadExpenseModal] = useState(false);

  const fetchExpenseDetails = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `${API_PATHS.EXPENSE.GET_ALL}`
      );

      if (response.data) {
        setExpenseData(response.data);
      }

    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const handleAddExpense = async (expense) => {
    const { category, amount, date, icon } = expense;
    if (!category.trim()) {
      toast.error("Category is required.")
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
      await axiosInstance.post(API_PATHS.EXPENSE.ADD, {
        category,
        amount,
        date,
        icon
      });

      setOpenAddExpenseModal(false);
      toast.success("Expense added successfully");
      fetchExpenseDetails();
    } catch (error) {
      toast.error("Error adding expense!");
    }
  }

  const deleteExpense = async (id) => {
    try {
      await axiosInstance.delete(`${API_PATHS.EXPENSE.DELETE(id)}`);
      setOpenDeleteAlert({ show: false, data: null });
      toast.success("Expense deleted successfully");
      fetchExpenseDetails();
    } catch (error) {
      toast.error("Failed to delete expense!");
    }
  }

  const handleDownloadExpenseDetails = async (month) => {
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
      const response = await axiosInstance.get(API_PATHS.EXPENSE.DOWNLOAD_EXCEL(month), {
        responseType: 'blob',
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `expense_details${month}.xlsx`);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
      setDownloadExpenseModal(false);
      toast.success("Expense details downloaded successfully");
    } catch (error) {
      toast.error("Failed to download expense details!");
    }
  }

  useEffect(() => {
    fetchExpenseDetails();
    return () => { };
  }, []);



  return (
    <DashboardLayout activeMenu="Expense">
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 gap-6">
          <div className="">
            <ExpenseOverview
              transactions={expenseData}
              onAddExpense={() => setOpenAddExpenseModal(true)}
            />
          </div>
          <ExpenseList
            transactions={expenseData}
            onDeleteExpense={(id) => setOpenDeleteAlert({ show: true, data: id })}
            onDownloadExpenseDetails={() => setDownloadExpenseModal(true)} />
        </div>
        <Modal
          isOpen={openAddExpenseModal}
          onClose={() => setOpenAddExpenseModal(false)}
          title="Add Expense"
        >
          <AddExpense onAddExpense={handleAddExpense} />
        </Modal>

        <Modal
          isOpen={openDeleteAlert.show}
          onClose={() => setOpenDeleteAlert({ show: false, data: null })}
          title="Delete Expense"
        >
          <DeleteAlert
            onDelete={() => deleteExpense(openDeleteAlert.data)}
            content="Are you sure you want to delete this expense?"
          />
        </Modal>
        <Modal
          isOpen={downloadExpenseModal}
          onClose={() => setDownloadExpenseModal(false)}
          title="Download Expense Details"
        >
          <DownloadExcelForm
            onDownload={(month) => handleDownloadExpenseDetails(month)}
            content="Enter the month for which you want to download expense details."
          />
        </Modal>
      </div>
    </DashboardLayout>
  )
}

export default Expense