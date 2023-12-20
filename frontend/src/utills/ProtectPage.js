import React, { useEffect } from "react";
import { UserAuth } from "../Context";

function ProtectPage({ children }) {
  const { currentUser } = UserAuth();
  useEffect(() => {
    if (!currentUser) return window.location = "/";
  }, [currentUser]);
  return <div>{children}</div>;
}

export default ProtectPage;
