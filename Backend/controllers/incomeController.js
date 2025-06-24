const Income = require("../models/Income.js");
const xlsx = require("xlsx")
const fs = require("fs");
const path = require("path");


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
        const incomes = await Income.find({ userId }).sort({ date: -1 }).limit(50);
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
    const filePath = path.join(__dirname, "../Income_details.xlsx");

    try{
        const month = req.params.month;
        let incomes;
        if (month) {    
            const [year, monthNumber] = month.split('-');
            const startDate = new Date(year, monthNumber - 1, 1);
            const endDate = new Date(year, monthNumber, 0, 23, 59, 59, 999);

            incomes = await Income.find({
            userId,
            date: {
                $gte: startDate,
                $lte: endDate
            }
            }).sort({ date: -1 });

            if (incomes.length === 0) {
            return res.status(404).json({ message: 'No income records found for this month' });
            }
        } else {
            incomes = await Income.find({ userId }).sort({ date: -1 });
        }

        const data = incomes.map((item)=>({
            Source: item.source,
            Amount: item.amount,
            Date: item.date
        }));

        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb, ws, "Incomes");
        xlsx.writeFile(wb, filePath);
        res.download(filePath, 'Income_details.xlsx', (err) => {
                    if (err) {
                        return res.status(500).json({ message: 'File download failed' });
                    }
                    fs.unlink(filePath,()=>{});
                });

    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

