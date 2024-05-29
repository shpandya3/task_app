import React, { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { Outlet, useNavigate } from "react-router-dom";

const AuthorizedRoutes = ({ permissions }) => {
  //   const { user } = useAuth();
  const userData = sessionStorage.getItem("user");
  const user = JSON.parse(userData);
  const navigate = useNavigate();

  useEffect(() => {
    if (!permissions?.includes(user?.role)) {
      navigate("/");
    }
  }, [user, permissions, navigate]);

  if (permissions?.includes(user?.role)) {
    return <Outlet />;
  }

  // Optionally, return a message or a loading indicator while redirecting
  return (
    <>
      <div>Redirecting...</div>
    </>
  );
};

export default AuthorizedRoutes;
