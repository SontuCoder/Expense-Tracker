const Expense = require("../models/Expense.js");
const xlsx = require("xlsx")
const fs = require("fs");
const path = require("path");


exports.addExpense = async(req, res)=>{
    const userId = req.user._id;

    try {
        const { icon, category, amount, date } = req.body;

        if ( !category || !amount || !date) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        
        const newExpense = await Expense.create({
            userId,
            category,
            amount,
            icon,
            date: new Date(date)
        });

        await newExpense.save();

        res.status(200).json({ message: 'Expense Added Successfully', newExpense });
    } catch (error) {
        res.status(500).json({ message: 'Server Error'});
    }
};


exports.getAllExpenses = async(req, res)=>{
    const userId = req.user._id;

    try {
        const expenses = await Expense.find({ userId }).sort({ date: -1 }).limit(50);
        res.status(200).json(expenses);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};


exports.deleteExpense = async(req, res)=>{

    try {
        const expense = await Expense.findById(req.params.id);

        if (!expense) {
            return res.status(404).json({ message: 'Expense not found' });
        }

        await Expense.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Expense Deleted Successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};


exports.downloadExpenseExcle = async (req, res) => {
    const userId = req.user._id;

    const filePath = path.join(__dirname, "../Expense_details.xlsx");
    try {
        const month = req.params.month;
        // Check if month parameter is provided
        if (!month) {
            return res.status(400).json({ message: "Month parameter is required" });
        }

        // Parse the selected month (expected format: 'YYYY-MM')
        const startDate = new Date(`${month}-01T00:00:00.000Z`);
        const endDate = new Date(startDate);
        endDate.setMonth(endDate.getMonth() + 1);

        const expenses = await Expense.find({
            userId,
            date: {
            $gte: startDate,
            $lt: endDate
            }
        }).sort({ date: -1 });

        const data = expenses.map((item) => ({
            Category: item.category,
            Amount: item.amount,
            Date: item.date
        }));

        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb, ws, "Expenses");

        xlsx.writeFile(wb, filePath);

        res.download(filePath, "Expense_details.xlsx", (err) => {
            if (err) {
                return res.status(500).json({ message: "File download failed" });
            }

            fs.unlink(filePath, () => {});
        });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

