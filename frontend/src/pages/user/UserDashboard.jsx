import React from "react";
import UserUpdates from "../../components/User/UserUpdates";
import UserChart from "../../components/User/UserChart";


const UserDashboard = () => {
  return (
    <div className="grid p-6 grid-nogutter">
      <div className="col-12 lg:col-8">
        <UserChart />
      </div>
      <div className="col-12 lg:col-4 pt-5 lg:pt-0 border-solid border-100">
        <UserUpdates />
      </div>
    </div>
  );
};

export default UserDashboard;
