import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../../Components/layouts/AuthLayout.jsx";
import Input from "../../Components/Inputs/input.jsx";
import {validateEmail} from "../../utils/helper.js";
import ProfilePhotoSelector from "../../Components/Inputs/ProfilePhotoSelector.jsx"
import axiosInstance from "../../utils/axiosInstance.js";
import { API_PATHS } from "../../utils/apiPaths.js";
import { UserContext } from "../../Context/userContext.jsx";
import toast from "react-hot-toast";
import uploadImage from "../../utils/uploadImage.js";


const Signup = () => {
  const [profilePic, setprofilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const [error, setError] = useState(null);

  const { updateUser } = useContext(UserContext);

  const navigate = useNavigate();

  const handleSignUp = async (e)=>{
    e.preventDefault();

    let profileImageUrl = "";
    if(!fullName){
      setError("Please enter your full name.");
      return ;
    }

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

      if(profilePic){
        const imageUploadRes = await uploadImage(profilePic);
        profileImageUrl = imageUploadRes.imageUrl || "";
      }
      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER,{
        fullName,
        email,
        password,
        profileImageUrl
      });

      const { token, user } = response.data;
      if(token){
        localStorage.setItem("expTracker", token);
        updateUser(user);
        navigate("/dashboard");
        toast.success("User register successfully.");
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
      <div className="lg:w-[100%] h-auto mt-10 md:mt-0 flex flex-col justify-center">
        <h3 className="text-xl font-semibold text-black">🚀 Create an Account 😀</h3>
        <p className="text-xs text-slate-700 mt-[5px] mb-6">
          Join us today by entering your details below.
        </p>

        <form onSubmit={handleSignUp}>

          <ProfilePhotoSelector image = {profilePic} setImage={setprofilePic}/>

          <div className="grid grid-cols-1 md:grid-cols-2 md:gap-4">

            <Input
              value={fullName}
              onChange={({ target })=> setFullName(target.value)}
              label= "Full Name"
              placeholder="John"
              type="text"
            />

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

          </div>
          {
            error && <p className="text-red-500 text-xs pb-2.5">{error}</p> 
          }
          <button type="submit" className="btn-primary">SIGNUP</button>
          <p className=" text-slate-800 my-3 text-[13px]">Already have an account?{" "}
            <Link to="/login" className="font-medium text-primary underline">LogIn</Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  )
}

export default Signup
