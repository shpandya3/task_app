import React from "react";

import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import ViewUsers from "../pages/user/ViewUsers";
import UpdateUser from "../pages/user/UpdateUser";
import UserDashboard from "../pages/user/UserDashboard";
import ViewTasks from "../pages/task/ViewTasks";
import AdminDashboard from "../pages/admin/AdminDashboard";
import Layout from "../pages/Layout";
import PrivateRoutes from "./PrivateRoutes";
import NoPermission from "../pages/NoPermission";
import AuthorizedRoutes from "./AuthorizedRoutes";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route element={<PrivateRoutes />}>
          <Route element={<AuthorizedRoutes permissions={["NORMAL"]} />}>
            <Route path="/users">
              <Route index element={<UserDashboard />} />
              <Route path="tasks" element={<ViewTasks />} />
              <Route path=":id" element={<UpdateUser />} />
            </Route>
          </Route>
          <Route element={<AuthorizedRoutes permissions={["ADMIN"]} />}>
            <Route path="/admin">
              <Route index element={<AdminDashboard />} />
              <Route path="view/users" element={<ViewUsers />} />
            </Route>
          </Route>
          <Route path="/no-permission" element={<NoPermission />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
