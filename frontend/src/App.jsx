import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Pages/Auth/Login.jsx";
import Signup from "./Pages/Auth/Signup.jsx";
import Home from "./Pages/Dashboard/Home.jsx";
import Income from "./Pages/Dashboard/Income.jsx";
import Expense from "./Pages/Dashboard/Expense.jsx";



function App() {

  return (
    <div className="">
      <Router>
        <Routes>
          <Route path="/" element={<Root/>}/>
          <Route path="/login" exact element={<Login/>}/>
          <Route path="/signup" exact element={<Signup/>}/>
          <Route path="/dashboard" exact element={<Home/>}/>
          <Route path="/income" exact element={<Income/>}/>
          <Route path="/expense" exact element={<Expense/>}/>

        </Routes>
      </Router>
    </div>
  )
}

export default App

const Root = ()=>{
  const isAthenticated = !!localStorage.getItem("token");
  return isAthenticated?(
    <Navigate to="/dashboard"/>
  ) : (
    <Navigate to="/login"/>
  )
}
