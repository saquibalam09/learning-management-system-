import React, { useEffect, useState } from "react";
import GoogleLogin from "./GoogleAuth";
import { GoogleOAuthProvider } from "@react-oauth/google";
import axiosInstance from "../Helpers/axiosInstance.js";

// import { fetchEnvVariables } from "../conf/fetchEnv.js";

const GoogleAuthWrapper = () => {
  const [clientId, setClientId] = useState("");
  const [loading, setLoading] = useState(true); // Loading state to track the fetching process
  // console.log(apiUrl);

  useEffect(() => {
    const getEnvVariables = async () => {
      try {
        // const { apiUrl } = await fetchEnvVariables();
        const response = axiosInstance.get("/env");
        const envVariables = (await response).data;
        setClientId(envVariables.apiUrl);
      } catch (error) {
        console.error("Failed to fetch Google Client ID:", error);
      } finally {
        setLoading(false); // Set loading to false after the fetch
      }
    };
    getEnvVariables();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Display a loading message or spinner while fetching
  }

  if (!clientId) {
    return <div>Error: Google Client ID is not available.</div>; // Handle missing clientId error
  }

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <GoogleLogin />
    </GoogleOAuthProvider>
  );
};

export default GoogleAuthWrapper;
