import React, { useEffect } from "react";
import { UserAuth } from "../Context";

function ProtectPage({ children }) {
  const { currentUser } = UserAuth();
  useEffect(() => {
    console.log("Current user in protected page : " + currentUser);
    if (!currentUser) return window.location = "/";
  }, [currentUser]);
  return <div>{children}</div>;
}

export default ProtectPage;
