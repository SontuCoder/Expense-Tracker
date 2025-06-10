const Income = require("../models/Income.js");
const xlsx = require("xlsx")


exports.addIncome = async(req, res)=>{
    const userId = req.user._id;

    try {
        const { icon, source, amount, date } = req.body;

        if ( !source || !amount || !date) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        
        const newIncome = await Income.create({
            userId,
            source,
            amount,
            icon,
            date: new Date(date)
        });

        await newIncome.save();

        res.status(200).json({ message: 'Income Added Successfully', newIncome });
    } catch (error) {
        res.status(500).json({ message: 'Server Error'});
    }
};


exports.getAllIncomes = async(req, res)=>{
    const userId = req.user._id;

    try {
        const incomes = await Income.find({ userId }).sort({ date: -1 });
        res.status(200).json(incomes);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};


exports.deleteIncomes = async(req, res)=>{

    try {
        const income = await Income.findById(req.params.id);
        
        if (!income) {
            return res.status(404).json({ message: 'Income not found' });
        }

        await Income.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Income Deleted Successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};


exports.downloadIncomeExcle = async(req, res)=>{
    const userId = req.user._id;
    try{
        const incomes = await Income.find({ userId }).sort({ date: -1 });

        const data = incomes.map((item)=>({
            Source: item.source,
            Amount: item.amount,
            Date: item.date
        }));

        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb, ws, "Income");
        xlsx.writeFile(wb, 'Income_details.xlsx');
        res.download('Income_details.xlsx');

    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

