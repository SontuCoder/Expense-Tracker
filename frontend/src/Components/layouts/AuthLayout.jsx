
import CARD_2 from "../../assets/images/card2.jpg";
import { LuTrendingUpDown } from "react-icons/lu"

const AuthLayout = ({ children }) => {
    return (
        <div className="flex">
            <div className="w-screen h-screen md:w-[60vw] px-12 pt-8 pb-12">
            <h2 className="text-3xl font-medium text-black logo">Expense Tracker</h2>
            {children}
            </div>

            <div className="hidden md:block w-[40vw] h-screen bg-violet-100 bg-auth-bg-img bg-cover bg-no-repeat bg-center overflow-hidden p-8 relative">
                <div className="w-48 h-48 rounded-[40px] bg-purple-600 absolute -top-7 -left-5 "></div>
                <div className="w-48 h-56 rounded-[40px] border-[20px] border-fuchsia-600 absolute top-[30%] -right-10"></div>
                <div className="w-48 h-48 bg-violet-500 absolute -bottom-7 -left-5"></div>

                <div className="grid grid-cols-1 z-20">
                    <StataInfoCard
                        icon={<LuTrendingUpDown/>}
                        label = "Track Your Income & Expenses"
                        value = " 430,000"
                        color = "bg-primary"
                    />
                </div>

                <img src={CARD_2} alt="authCard" className="w-64 lg:w-[89%] absolute bottom-10 shadow-lg shadow-blue-400/15  rounded-2xl" />
            </div>
        </div>
    )
}

export default AuthLayout;

const StataInfoCard = ({
    icon, label, value, color
})=>{
    return (
        <div className="flex items-center gap-6 bg-white p-6 rounded-xl shadow-md shadow-purple-400/15 border border-gray-200/50 z-10">
            <div className={`w-12 h-12 flex items-center justify-center text-white ${color} rounded-full drop-shadow-xl`}>
                {icon}
            </div>
            <div className="">
                <h6 className="text-xs text-gray-500 mb-1">{label}</h6>
                <span className="text-[20px]">${value}</span>
            </div>
        </div>
    )
}