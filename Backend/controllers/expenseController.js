const Expense = require("../models/Expense.js");
const xlsx = require("xlsx")


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
        const expenses = await Expense.find({ userId }).sort({ date: -1 });
        res.status(200).json(expenses);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};


exports.deleteExpense = async(req, res)=>{

    try {
        const expense = await Income.findById(req.params.id);
        
        if (!expense) {
            return res.status(404).json({ message: 'Expense not found' });
        }

        await Expense.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Expense Deleted Successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};


exports.downloadExpenseExcle = async(req, res)=>{
    const userId = req.user._id;
    try{
        const expense = await Expense.find({ userId }).sort({ date: -1 });

        const data = expense.map((item)=>({
            Source: item.source,
            Amount: item.amount,
            Date: item.date
        }));

        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb, ws, "Expenses");
        xlsx.writeFile(wb, 'Expense_details.xlsx');
        res.download('Expense_details.xlsx');

    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

