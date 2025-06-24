import {
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Area,
    AreaChart,
    ResponsiveContainer
} from "recharts";


const CustomLineChart = ({ data }) => {

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white shadow-lg p-2 rounded-lg border border-gray-300">
                    <p className="text-xs font-semibold text-purple-800 mb-1">{payload[0].payload.category}</p>
                    <p className="text-sm text-gray-600">
                        Amount: <span className="text-sm font-medium text-gray-900">₹ {payload[0].payload.amount}</span>
                    </p>
                </div>
            );
        }
        return null;
    }

    return (
        <div className="bg-white">
        <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={data}>
            <defs>
                <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#875cf5" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#875cf5" stopOpacity={0} />
                </linearGradient>
            </defs>
            <CartesianGrid stroke ="none" />
            <XAxis dataKey="month" tick={{ fill: "#555", fontSize: 12 }} stroke="none"/>
            <YAxis tick={{ fill: "#555", fontSize: 12 }} stroke="none" />
            <Tooltip content={<CustomTooltip />} />
            <Area type="monotone" dataKey="amount" stroke="#875cf5" fill="url(#incomeGradient)" strokeWidth={3} dot={{ r:3, fill: '#ab8bf8' }} />
            </AreaChart>
        </ResponsiveContainer>
    </div>  
    )
}

export default CustomLineChart
