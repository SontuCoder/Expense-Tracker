import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from 'react-hot-toast';


import Login from "./Pages/Auth/Login.jsx";
import Signup from "./Pages/Auth/Signup.jsx";
import Home from "./Pages/Dashboard/Home.jsx";
import Income from "./Pages/Dashboard/Income.jsx";
import Expense from "./Pages/Dashboard/Expense.jsx";
import UserProvider from "./Context/userContext.jsx";



function App() {

  return (
    <UserProvider>
    <div className="">
      <Router>
        <Routes>
          <Route path="/" element={<Root />} />
          <Route path="/login" exact element={<Login />} />
          <Route path="/signup" exact element={<Signup />} />
          <Route path="/dashboard" exact element={<Home />} />
          <Route path="/income" exact element={<Income />} />
          <Route path="/expense" exact element={<Expense />} />

        </Routes>
      </Router>
      <Toaster position="top-center" reverseOrder={false} toastOptions={{
        // Common style for all toasts
        style: {
          background: '#333',
          color: '#fff',
          boxShadow: '0 4px 14px rgba(0, 0, 0, 0.25)',
          borderRadius: '10px',
          padding: '12px 16px',
        }
      }} />
    </div>
    </UserProvider>
  )
}

export default App

const Root = () => {
  const isAthenticated = !!localStorage.getItem("expTracker");
  return isAthenticated ? (
    <Navigate to="/dashboard" />
  ) : (
    <Navigate to="/login" />
  )
}
