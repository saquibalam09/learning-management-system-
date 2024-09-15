import React from "react";
import { FiMenu } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { AiFillCloseCircle } from "react-icons/ai";

import Footer from "../Components/Footer";
import Signup from "../Pages/Signup";
import { logout } from "../Redux/Slices/AuthSlice";

function HomeLayout({ children }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // for checking if user is logged in

  const isLoggedIn = useSelector((state) => state?.auth?.isLoggedIn);

  // for displaying Options acc to role

  const role = useSelector((state) => state?.auth?.role);

  function changeWidth() {
    const drawerSide = document.getElementsByClassName("drawer-side");
    drawerSide[0].style.width = "auto";
  }

  function hideDrawer() {
    const element = document.getElementsByClassName("drawer-toggle");
    element[0].checked = false;

    const drawerSide = document.getElementsByClassName("drawer-side");
    drawerSide[0].style.width = 0;
    // changeWidth();
  }

  async function handleLogout(e) {
    e.preventDefault();
    const res = await dispatch(logout());
    if (res?.payload?.success) {
      navigate("/");
    }
  }

  return (
    <div className="min-h-[90vh] left-0">
      <div className="drawer absolute left-0 z-50 w-fit">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content ">
          {/* Page content here */}
          <label htmlFor="my-drawer" className="cursor-pointer relative">
            <FiMenu
              onClick={changeWidth}
              size={"32px"}
              className="font-bold text-white m-4"
            />
          </label>
        </div>
        <div className="drawer-side w-0">
          <label htmlFor="my-drawer" className="drawer-overlay"></label>
          <ul className=" menu h-[100%] p-4 pb-12 w-48 sm:w-80 bg-base-200 text-base-content relative">
            <li className="w-fit absolute right-2 z-50">
              <button onClick={hideDrawer}>
                <AiFillCloseCircle size={24} />
              </button>
            </li>
            <li className="mr-10">
              <Link to="/">Home</Link>
            </li>
            {isLoggedIn && role === "ADMIN" && (
              <li className="mr-10">
                <Link to="/admin/dashboard">Admin DashBoard</Link>
              </li>
            )}
            {isLoggedIn && role === "ADMIN" && (
              <li className="mr-10">
                <Link to="/course/create">Create new course</Link>
              </li>
            )}
            <li className="mr-10">
              <Link to="/courses">All Courses</Link>
            </li>
            <li className="mr-10">
              <Link to="/contact">Contact Us</Link>
            </li>
            <li className="mr-10">
              <Link to="/about">About Us</Link>
            </li>
            {!isLoggedIn && (
              <li className="absolute bottom-4 w-[90%]">
                <div className="w-full flex items-center justify-center">
                  <button className=" bg-transparent hover:bg-blue-500 px-4 py-1 font-semibold rounded-md w-fit">
                    <Link to="/login">Login</Link>
                  </button>
                  <button className=" bg-transparent hover:bg-blue-500 px-4 py-1 font-semibold rounded-md w-fit">
                    <Link to="/signup">SignUp</Link>
                  </button>
                </div>
              </li>
            )}
            {isLoggedIn && (
              <li className="absolute bottom-4 w-[90%]">
                <div className="w-full flex items-center justify-center ">
                  <button className="bg-transparent hover:bg-blue-500 px-4 py-1 font-semibold rounded-md w-full text">
                    <Link to="/user/profile">Profile</Link>
                  </button>
                  <button className=" bg-transparent hover:bg-blue-500 px-4 py-1 font-semibold rounded-md w-full">
                    <Link onClick={handleLogout}>Logout</Link>
                  </button>
                </div>
              </li>
            )}
          </ul>
        </div>
      </div>
      {children}
      <Footer />
    </div>
  );
}

export default HomeLayout;
