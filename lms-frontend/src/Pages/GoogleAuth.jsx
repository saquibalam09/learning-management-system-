import React from "react";
import { GoogleOAuthProvider, useGoogleLogin } from "@react-oauth/google";
// import { googleAuth } from "../Helpers/axiosInstance";
import { createAccountBygoogle } from "../Redux/Slices/AuthSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function GoogleLogin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const responseGoogle = async (authResult) => {
    try {
      if (authResult["code"]) {
        const response = await dispatch(
          createAccountBygoogle(authResult["code"])
        );
        console.log(response);

        if (response) navigate("/");

        // const { email, name, picture } = response.data.user;
        // console.log(result);
      }

      // console.log(authResult);
    } catch (error) {
      console.log("Error while requesting google code : ", error);
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: responseGoogle,
    onError: responseGoogle,
    flow: "auth-code",
  });

  return (
    <div>
      <button
        type="button"
        onClick={googleLogin}
        className="flex flex-row py-3  px-10 bg-slate-600 rounded-md gap-1 hover:bg-slate-500 transition-all ease-in-out duration-200"
      >
        <img
          className="w-6"
          src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png"
        />

        <span className="">Sign in with Google</span>
      </button>
    </div>
  );
}

export default GoogleLogin;
