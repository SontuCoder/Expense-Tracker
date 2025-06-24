import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../../Components/layouts/AuthLayout.jsx";
import Input from "../../Components/Inputs/input.jsx";
import {validateEmail} from "../../utils/helper.js";
import { API_PATHS } from "../../utils/apiPaths.js"; 
import axiosInstance from "../../utils/axiosInstance.js";
import toast from "react-hot-toast";
import { UserContext } from "../../Context/userContext.jsx";

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const [error, setError] = useState(null);

  const { updateUser } = useContext(UserContext);

  const navigate = useNavigate();

  const handleLogin = async (e)=>{
    e.preventDefault();

    if(!validateEmail(email)){
      setError("Please enter a valid email address.");
      return ;
    }

    if(!password){
      setError("Please enter the password.");
      return;
    }
    setError("");
    try{
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password
      });
      const { token, user } = response.data;

      if(token){
        localStorage.setItem("expTracker", token);
        updateUser(user);
        navigate("/dashboard");
        toast.success("Login successfull.");
      }

    } catch (error) {
      if(error.response && error.response.data.message){
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again.")
      }
    }
  }

  return (
    <AuthLayout>
      <div className="lg:w-[70%] h-3/4 flex flex-col justify-center">
        <h3 className="text-xl font-semibold text-black">🚀 Welcome Back 😀</h3>
        <p className="text-xs text-slate-700 mt-[5px] mb-6">Please enter your details to log in</p>

        <form onSubmit={handleLogin}>
          <Input
            value = {email}
            onChange = {({target})=>setEmail(target.value)}
            label = "Email Address"
            placeholder = "user@example.com"
            type = "text"
          />
          <Input
            value = {password}
            onChange = {({target})=>setPass(target.value)}
            label = "Password"
            placeholder = "user@pass"
            type = "password"
          />

          {
            error && <p className="text-red-500 text-xs pb-2.5">{error}</p> 
          }
          <button type="submit" className="btn-primary">LOGIN</button>
          <p className=" text-slate-800 mt-3 text-[13px]"> Don't have an account?{" "}
            <Link to="/signup" className="font-medium text-primary underline">SignUp</Link>
          </p>
        </form>

      </div>
    </AuthLayout>
  )
}

export default Login