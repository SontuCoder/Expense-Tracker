import { LuDownload } from "react-icons/lu";
import TransactionInfoCard from "../Cards/TransactionInfoCard.jsx";
import moment from "moment";

const ExpenseList = ({ transactions, onDeleteExpense, onDownloadExpenseDetails }) => {
    return (
        <div className="card">
            <div className="flex justify-between items-center"> 
                <h5 className="text-lg font-semibold underline">
                    All Expenses
                </h5>
                <button
                    className="card-btn"
                    onClick={onDownloadExpenseDetails}>
                        <LuDownload className="text-base" />
                        Download
                    </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2">
                {transactions?.map((expense)=>(
                    <TransactionInfoCard
                        key={expense._id}
                        title={expense.category}
                        icon={expense.icon}
                        date={moment(expense.date).format("Do MMM YYYY")}
                        amount={expense.amount}
                        type="expense"
                        onDelete={()=> onDeleteExpense(expense._id)}
                    />
                ))}
            </div>
        </div>
    )
}

export default ExpenseList