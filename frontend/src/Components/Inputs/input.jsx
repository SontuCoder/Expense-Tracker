import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

const Input = ({ value, onChange, placeholder, label, type }) => {
    const [showPass, setShowPass] = useState(false);
    const togglePass = ()=>{
        setShowPass(!showPass);
    }

    return (
        <div>
            <label className="text-[15px] font-semibold text-slate-800">{label}</label>

            <div className="input-box">
                <input 
                    type= {type == 'password' ? showPass ? 'text' : 'password' : type }
                    placeholder={placeholder}
                    onChange={(e)=>onChange(e)}
                    value={value}
                    className="w-full bg-transparent outline-none"
                />
                {type === "password" &&(
                    <>
                        { showPass ? (
                            <FaRegEye
                                size = {22}
                                className="text-primary cursor-pointer"
                                onClick ={()=> togglePass()}
                            />
                        ) : (
                            <FaRegEyeSlash
                                size = {22}
                                className="text-slate-400 cursor-pointer"
                                onClick ={()=> togglePass()}
                            />
                        )}
                    </>
                )}
            </div>
        </div>
    )
}

export default Input
