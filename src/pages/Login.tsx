import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/features/actions/auth";

const Login = () => {
  useEffect(() => {
    // isPublic();
  }, []);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
const navigate = useNavigate();
  const dispatch = useDispatch();

  const handlelogin = async (e: any) => {
    e.preventDefault();
    e.preventDefault();

    if(email === "" || password === ""){
      toast.error("Please fill all the fields");
      return;
    }
    setIsLoading(true);

    const data = {
      email,
      password
    }
    const HOST: string = import.meta.env.VITE_BACKEND_URL;

    const response = await fetch(`${HOST}/api/auth/login`, {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
  });
  
  const result = await response.json();
  
  console.log(response);
  
  if (response.status === 200) {
      console.log(result);
  
      // Ensure that the token is available in the response
      if (result.user && result.user.token) {
          // Store the token in local storage
          localStorage.setItem("token", result.user.token);
          toast.success("Login Successfull");
  
          // Fetch user details using the user ID
          const userResponse = await fetch(`${HOST}/api/users/${result.user.id}`, {
              headers: {
                  "Authorization": `Bearer ${result.user.token}`
              }
          });
          const userData = await userResponse.json();
  
          if (userResponse.status === 200) {
              // Include the token in the user object
              const userWithToken = {
                  ...userData.user,
                  token: result.user.token
              };
  
              // Store the user information in local storage
              localStorage.setItem("user", JSON.stringify(userWithToken));
          }
  
          setIsLoading(false);
          navigate('/');
      } else {
          toast.error("Token is missing in the response");
          setIsLoading(false);
      }
  } else {
      toast.error("wrong credentials");
      setIsLoading(false);
  }
  
  
  
  

   
  };

  return (

    <div className="flex items-center h-screen justify-center bg-gray-100">
      <div className="">
        <div className="h-full flex items-center justify-center" style={{ height: "calc(100vh - 15rem)" }}>
          <img
            src="https://images.unsplash.com/photo-1530612077338-1cbb105de5f3?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Registration"
            className="h-auto max-w-full max-h-full"
          />
        </div>
      </div>
      <ToastContainer />
    
    <div className="w-full max-w-md p-8 bg-white rounded shadow-lg">
  <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Login</h2>
  <form className="mb-4" action="#" method="post">
    <div className="mb-4 md:w-full">
      <label htmlFor="email" className="block text-sm font-semibold text-gray-700">Username or Email</label>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full px-3 py-2 mt-1 text-sm border rounded-md outline-none focus:border-indigo-500"
        type="email"
        name="email"
        id="email"
        placeholder="Username or Email"
      />
    </div>
    <div className="mb-6 md:w-full">
      <label htmlFor="password" className="block text-sm font-semibold text-gray-700">Password</label>
      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full px-3 py-2 mt-1 text-sm border rounded-md outline-none focus:border-indigo-500"
        type="password"
        name="password"
        id="password"
        placeholder="Password"
      />
    </div>
    {isLoading ? (
      <button className="w-full px-4 py-2 mt-4 text-sm font-semibold text-white bg-blue-200 rounded-md hover:bg-blue-300 focus:outline-none focus:bg-blue-300">Loading...</button>
    ) : (
      <button onClick={handlelogin} className="w-full px-4 py-2 mt-4 text-sm font-semibold text-white bg-indigo-500 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600">Login</button>
    )}
  </form>
  <p className="mt-8 text-sm text-center text-gray-600">Don't have an account? <Link to="/register" className="text-indigo-500">Register</Link></p>
</div>
</div>


  );
};

export default Login;
