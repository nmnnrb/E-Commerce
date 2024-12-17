import React, { useState } from "react";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";


const Login = ({setToken}) => {
  const [email, setEmail] = useState("snaman9967@gmail.com");
  const [password, setPassword] = useState("123");
  const [showPopup, setShowPopup] = useState(true); // State to control popup visibility

  // Close popup when clicking the close button
  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post(backendUrl + "/api/user/admin" , {email,password});
      if(response.data.token){
        setToken(response.data.token);
        toast.success("Login successful")
      }else{
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to login")
    }
  };

  return (
    <div className=" min-h-screen flex items-center justify-center w-full ">

{showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-md">
            <h2 className="text-2xl font-bold text-red-600 mb-4">**ATTENTION!!</h2>
            <p className="text-gray-600 mb-6">
              For testing purposes, make sure the backend is up and running. <a  className="bg-blue-600 px-2 py-1 rounded-md text-white" href='https://e-commerce-backend-8x0r.onrender.com/' > Go to BackendURL</a> As the project is hosted on the free server , it will take sometime to work on the Production.
            </p>
            <button
              onClick={handleClosePopup}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300"
            >
              Close
            </button>
          </div>
        </div>
      )}

      <div className="bg-white shadow-md rounded-lg px-8 py-6 max-w-md">
        <h1 className="  text-center text-zinc-900 text-2xl font-bold mb-6">
          Admin Pannel
        </h1>
        <form onSubmit={onSubmitHandler}>
          <div className="mb-3 min-w-72">
            <p className="text-sm font-medium text-gray mb-2">Email Address</p>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="border-2 rounded-md py-2 px-3 w-full  border-gray-300 outline-none"
              type="email"
              placeholder="your@email.com"
              required
            />
          </div>
          <div className="mb-3 min-w-72">
            <p className="text-sm font-medium text-gray mb-2">Password</p>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="border-2 rounded-md py-2 px-3 w-full  border-gray-300 outline-none"
              type="password"
              placeholder="Password"
              required
            />
          </div>

          <span className="text-red-600 text-sm font-bold " >*For Testing purpose direct login -  <span className="" >Make Sure the backend should working fine - <a className="hover:blue-800 text-white px-2 py-1  rounded-xl bg-blue-600" href="https://e-commerce-backend-8x0r.onrender.com/">BackendURL</a> </span>  </span>
          <button
            className="bg-orange-500 mx-auto block  text-white rounded-xl w-2/3 mt-4 shadow-md py-2 px-4"
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
