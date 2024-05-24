import React, { useContext, useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { isJwtExpired } from "../utils/checkJwtExpired";
import LoginDialogue from "../components/Home/LoginDialogue";
import { LoginDialogueContext } from "../context/LoginDialogueContext";

const PrivateRoutes = () => {
  const token = localStorage.getItem("token");
  const location = useLocation();
  const { showLoginDialogue, toggleLoginDialogue} = useContext(LoginDialogueContext)
//   const [showLoginDialogue, setShowLoginDiaogue] = useState(false);

  useEffect(() => {
    if (token && isJwtExpired()) {
        toggleLoginDialogue(true);
    }
  }, [location, token, toggleLoginDialogue]);

  if (token) {
    return (
      <>
        {showLoginDialogue && <LoginDialogue />}
        <Outlet />
      </>
    );
  }

  return <Navigate to="/" />;
};

export default PrivateRoutes;
