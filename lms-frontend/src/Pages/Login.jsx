import React, { useState } from "react";
import HomeLayout from "../Layouts/HomeLayout";
import { BsPersonCircle } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { login } from "../Redux/Slices/AuthSlice.js";
import GoogleLogin from "./GoogleAuth.jsx";
import GoogleAuthWrapper from "./GoogleAuthWrapper.jsx";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  function handleUserInput(e) {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  }

  async function onLogin(e) {
    e.preventDefault();
    if (!loginData.email || !loginData.password) {
      toast.error("Please fill all the details");
      return;
    }

    // checking name

    // if(loginData.fullName.length < 5){
    //     toast.error("Name should atleast be of 5 character.");
    //     return;
    // }

    // email validation
    if (
      !loginData.email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
    ) {
      toast.error("Email is not valid.");
      return;
    }
    //checking password validation
    // if(!loginData.password.match(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/)){
    //     toast.error("Password should be 6-16 character with atleast a number and special chracter.");
    //     return;
    // }

    // dispatch create account action
    const response = await dispatch(login(loginData));

    if (response?.payload?.success) {
      navigate("/");
    }

    setLoginData({
      email: "",
      password: "",
    });
  }

  return (
    <HomeLayout>
      <div className="flex justify-center items-center h-[90vh] w-full">
        <form
          noValidate
          onSubmit={onLogin}
          className="flex flex-col justify-center gap-3 rounded-lg p-4 text-white items-center w-96 shadow-[0_0_10px_black]"
        >
          <h1 className="text-center text-2xl font-bold">Login Page</h1>

          <div className="w-3/4 flex flex-col gap-1">
            <label htmlFor="email" className="font-semibold">
              Email
            </label>
            <input
              type="text"
              required
              name="email"
              id="email"
              placeholder="Enter your email..."
              className="bg-trasparent px-2 py-1 border"
              onChange={handleUserInput}
              value={loginData.email}
            />
          </div>
          <div className="w-3/4 flex flex-col gap-1">
            <label htmlFor="password" className="font-semibold">
              Password
            </label>
            <input
              type="password"
              required
              name="password"
              id="password"
              placeholder="Enter your password..."
              className="bg-trasparent px-2 py-1 border"
              onChange={handleUserInput}
              value={loginData.password}
            />
          </div>
          <button
            type="submit"
            className="w-1/2 mt-1 bg-yellow-600 font-semibold py-2 hover:bg-yellow-500 text-lg cursor-pointer transition-all ease-in-out duration-200 rounded-md"
          >
            Login
          </button>
          <p className="mt-1">
            Don't have an account ?{" "}
            <Link
              className="link text-accent rounded-md font-semibold cursor-pointer"
              to="/signup"
            >
              SignUp
            </Link>
          </p>
          <GoogleAuthWrapper />
        </form>
      </div>
    </HomeLayout>
  );
}

export default Login;
