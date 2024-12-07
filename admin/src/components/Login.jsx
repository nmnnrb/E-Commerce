import React, { useState } from "react";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";


const Login = ({setToken}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
