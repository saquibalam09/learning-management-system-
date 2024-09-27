import React, { useEffect, useState } from "react";
import GoogleLogin from "./GoogleAuth";
import { GoogleOAuthProvider } from "@react-oauth/google";
import axiosInstance from "../Helpers/axiosInstance.js";

// import { fetchEnvVariables } from "../conf/fetchEnv.js";

const GoogleAuthWrapper = () => {
  const [apiUrl, setApiUrl] = useState("");
  console.log(apiUrl);

  useEffect(() => {
    const getEnvVariables = async () => {
      // const { apiUrl } = await fetchEnvVariables();
      const response = axiosInstance.get("/env");
      const envVariables = (await response).data;
      setApiUrl(envVariables.apiUrl);
    };

    getEnvVariables();
  }, []);

  return (
    <GoogleOAuthProvider clientId={apiUrl}>
      <GoogleLogin />
    </GoogleOAuthProvider>
  );
};

export default GoogleAuthWrapper;
