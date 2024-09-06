import React, { useEffect } from 'react'
import HomeLayout from '../../Layouts/HomeLayout';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { getUserData } from '../../Redux/Slices/AuthSlice';
import toast from 'react-hot-toast';
import { cancelCourseBundle } from '../../Redux/Slices/RazorpaySlice';

function Profile() {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const userData = useSelector((state) => state?.auth?.data);
    
     // function to handle the cancel subscription of course
    const handleCourseCancelSubscription = async () => {
        toast.info("Initiating cancellation")
        await dispatch(cancelCourseBundle());
        await dispatch(getUserData());
        toast.success("Cancellation completed.!")
        navigate('/');
    };

    useEffect(() => {
        // getting user details
        dispatch(getUserData());
    }, []);


    return (
    <HomeLayout>
      <div className="min-h-[90vh] flex items-center justify-center">
        <div className="my-10 w-auto flex flex-col gap-4 rounded-lg p-4 text-white  shadow-[0_0_10px_black]">
          <img
            className="w-40 m-auto rounded-full border border-black"
            src={userData?.avatar?.secure_url}
            alt="user profile image"
          />

          <h3 className="text-xl font-semibold text-center capitalize">
            {userData?.fullName}
          </h3>

          <div className="grid grid-cols-2">
            <p>Email :</p>
            <p>{userData?.email}</p>
            <p>Role :</p>
            <p>{userData?.role}</p>
            <p>Subscription :</p>
            <p>
              {userData?.subscription?.status === "active"
                ? "Active"
                : "Inactive"}
            </p>
          </div>

          {/* button to change the password */}
          <div className="flex items-center justify-between gap-2">
            <Link
              to={
                // userData?.email === "test@gmail.com"
                //   ? "/denied"
                  "/changepassword"
              }
              className="w-1/2 bg-yellow-600 hover:bg-yellow-700 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold cursor-pointer text-center"
            >
              <button>Change Password</button>
            </Link>

            <Link
              to={
                // userData?.email === "test@gmail.com"
                //   ? "/denied"
                  "/user/editprofile"
              }
              className="w-1/2 border border-yellow-600 hover:border-yellow-500 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold cursor-pointer text-center"
            >
              <button>Edit Profile</button>
            </Link>
          </div>

          {userData?.subscription?.status === "active" && (
            <button
              onClick={handleCourseCancelSubscription}
              className="w-full bg-red-600 hover:bg-red-500 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold cursor-pointer text-center"
            >
              Cancel Subscription
            </button>
          )}
        </div>
      </div>
    </HomeLayout>
    )
}

export default Profile;
