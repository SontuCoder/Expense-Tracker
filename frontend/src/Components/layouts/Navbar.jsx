import { useState } from "react";
import {HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import SideMenu from "./SideMenu";

const Navbar = ({ activeMenu }) => {
    const [ openSideMenu, setOpenSideMenu ] = useState(false);

    return (
        <div className="flex  gap-5 bg-white border border-b border-gray-200/50 backdrop-blur-[2px] py-4 px-7 sticky top-0 z-30">
            <button
            className="block lg:hidden text-black"
            onClick={()=>{
                setOpenSideMenu(!openSideMenu);
            }}>
                {openSideMenu?(
                    <HiOutlineX className="text-2xl"/>
                ):(
                    <HiOutlineMenu className="text-2xl"/>
                )}
            </button>
            <div className="flex flex-col ">
                <h2 className="text-2xl font-medium text-black logo">Expense Tracker</h2>
            <p className="text-sm font-medium text-slate-700">❤️ Love from Sontu</p>
            </div>
            {
                openSideMenu && (
                    <div className="fixed top-[90px] -ml-7 bg-white">
                        <SideMenu activeMenu={activeMenu}/>
                    </div>
                )
            }
        </div>
    )
}

export default Navbar
