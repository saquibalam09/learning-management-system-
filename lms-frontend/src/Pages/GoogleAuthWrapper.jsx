import React from "react";
import GoogleLogin from "./GoogleAuth";
import { GoogleOAuthProvider } from "@react-oauth/google";
import conf from "./conf/conf";

const GoogleAuthWrapper = () => {
  console.log(conf.api_key);

  return (
    <GoogleOAuthProvider clientId={conf.api_key}>
      <GoogleLogin />
    </GoogleOAuthProvider>
  );
};

export default GoogleAuthWrapper;
