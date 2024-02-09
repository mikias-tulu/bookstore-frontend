import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
// import axios from "axios";
// import isPublic from "../utils/isPublic";
// import { ToastContainer, toast } from "react-toastify";

import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/features/actions/auth";


const Register = () => {
  useEffect(() => {
    // isPublic();
  }, []);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleRegister = async (e: any) => {
    e.preventDefault();
    e.preventDefault();

    if(email === "" || password === ""){
      toast.error("Please fill all the fields");
      return;
    }
    setIsLoading(true);

    const data = {
      email,
      password,
      name
    }
    const HOST: string = import.meta.env.VITE_BACKEND_URL;

    const response = await fetch(`${HOST}/api/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    console.log(result);
    if (response.status === 200) {
      toast.success("Registration Successfull");
      setIsLoading(false);
    navigate('/login');
    } else {
      toast.error(result.message);
      setIsLoading(false);
    }  

  };

  return (
    

    <div className="flex items-center h-screen justify-center bg-gray-100">
      <div className="">
        <div className="h-full flex items-center justify-center" style={{ height: "calc(100vh - 5rem)" }}>
          <img
            src="https://images.unsplash.com/photo-1576479854195-52883a461a68?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Registration"
            className="h-auto max-w-full max-h-full"
          />
        </div>
      </div>
      <ToastContainer />
      <div className="w-full max-w-md p-8 bg-white rounded shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Create an Account</h2>
        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-semibold text-gray-700">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 mt-1 text-sm border rounded-md outline-none focus:border-indigo-500"
              placeholder="Enter your name"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 mt-1 text-sm border rounded-md outline-none focus:border-indigo-500"
              placeholder="Enter your email address"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-semibold text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 mt-1 text-sm border rounded-md outline-none focus:border-indigo-500"
              placeholder="Enter your password"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="cpassword" className="block text-sm font-semibold text-gray-700">Confirm Password</label>
            <input
              type="password"
              id="cpassword"
              value={cpassword}
              onChange={(e) => setCPassword(e.target.value)}
              className="w-full px-3 py-2 mt-1 text-sm border rounded-md outline-none focus:border-indigo-500"
              placeholder="Confirm your password"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 mt-4 text-sm font-semibold text-white bg-indigo-500 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
          >
            {isLoading ? "Loading..." : "Register"}
          </button>
        </form>
        <p className="mt-8 text-sm text-center text-gray-600">
          Already have an account? <Link to="/login" className="text-indigo-500">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
