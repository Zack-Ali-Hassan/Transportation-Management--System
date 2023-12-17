import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
function AppLayout(props) {
  const location = useLocation();
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (location.pathname != "/" && location.pathname != "/forget") {
      setShow(true);
    } else {
    }
  }, []);
  return <>{show && props.children}</>;
}

export default AppLayout;
