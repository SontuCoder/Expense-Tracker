import moment from "moment";

export const validateEmail = (email)=>{
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

export const addThousandsSeparator = (num)=>{
    if(num == null || isNaN(num)) return "";

    const [integerPart, fractionalPart] = num.toString().split(".");
    const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g,",");
    
    return fractionalPart ? `${formattedInteger}.${fractionalPart}` : formattedInteger;
}

export const prepareExpenseBarChartData = (data =[])=>{
    return data.map((item)=>({
        category: item?.category,
        amount: item?.amount,
    }))
}

export const prepareIncomeBarChartData = (data = [])=>{
    const sortedData = [...data].sort((a, b)=>new Date(a.date) - new Date(b.date));
    return sortedData.map(item => ({
        month: moment(item?.date).format('Do MMM'),
        amount: item?.amount,
        source: item?.source,
    }));
}

export const prepareExpenseLineChartData = (data = [])=>{
    const sortedData = [...data].sort((a, b)=>new Date(a.date) - new Date(b.date));
    return sortedData.map(item => ({
        month: moment(item?.date).format('Do MMM'),
        amount: item?.amount,
        category: item?.category,
    }));
}